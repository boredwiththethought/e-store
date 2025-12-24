import { Router, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../db";
import { authMiddleware, AuthRequest } from "../middleware";

const router = Router();

interface Favorite {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
}

// In-memory favorites for mock mode
interface MockFavorite {
  _id: string;
  userId: string;
  productId: string;
  createdAt: Date;
}
const mockFavorites: MockFavorite[] = [];

function isDBConnected(): boolean {
  return db !== null;
}

// GET /api/favorites - Get all favorites for current user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (isDBConnected()) {
      const userId = new ObjectId(req.userId);

      const favorites = await db!
        .collection<Favorite>("favorites")
        .aggregate([
          { $match: { userId } },
          {
            $lookup: {
              from: "products",
              localField: "productId",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          { $sort: { createdAt: -1 } },
        ])
        .toArray();

      res.json({
        favorites: favorites.map((f) => ({
          _id: f._id?.toString(),
          productId: f.productId.toString(),
          product: {
            ...f.product,
            _id: f.product._id.toString(),
          },
          createdAt: f.createdAt,
        })),
      });
    } else {
      // Mock mode
      const userFavorites = mockFavorites.filter(
        (f) => f.userId === req.userId
      );
      res.json({
        favorites: userFavorites.map((f) => ({
          _id: f._id,
          productId: f.productId,
          createdAt: f.createdAt,
        })),
      });
    }
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ error: "Failed to get favorites" });
  }
});

// POST /api/favorites - Add product to favorites
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ error: "Product ID is required" });
      return;
    }

    if (isDBConnected()) {
      const userId = new ObjectId(req.userId);
      const prodId = new ObjectId(productId);

      const product = await db!.collection("products").findOne({ _id: prodId });
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const existing = await db!.collection<Favorite>("favorites").findOne({
        userId,
        productId: prodId,
      });

      if (existing) {
        res.status(400).json({ error: "Product already in favorites" });
        return;
      }

      const favorite: Favorite = {
        userId,
        productId: prodId,
        createdAt: new Date(),
      };

      const result = await db!
        .collection<Favorite>("favorites")
        .insertOne(favorite);

      res.status(201).json({
        message: "Added to favorites",
        favorite: {
          _id: result.insertedId.toString(),
          productId: productId,
          createdAt: favorite.createdAt,
        },
      });
    } else {
      // Mock mode
      const existing = mockFavorites.find(
        (f) => f.userId === req.userId && f.productId === productId
      );
      if (existing) {
        res.status(400).json({ error: "Product already in favorites" });
        return;
      }

      const mockFavorite: MockFavorite = {
        _id: `mock-fav-${Date.now()}`,
        userId: req.userId!,
        productId,
        createdAt: new Date(),
      };

      mockFavorites.push(mockFavorite);

      res.status(201).json({
        message: "Added to favorites (mock mode)",
        favorite: mockFavorite,
      });
    }
  } catch (error) {
    console.error("Add favorite error:", error);
    res.status(500).json({ error: "Failed to add to favorites" });
  }
});

// DELETE /api/favorites/:productId - Remove from favorites
router.delete(
  "/:productId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { productId } = req.params;

      if (!productId) {
        res.status(400).json({ error: "Product ID is required" });
        return;
      }

      if (isDBConnected()) {
        const userId = new ObjectId(req.userId);
        const prodId = new ObjectId(productId);

        const result = await db!.collection<Favorite>("favorites").deleteOne({
          userId,
          productId: prodId,
        });

        if (result.deletedCount === 0) {
          res.status(404).json({ error: "Favorite not found" });
          return;
        }

        res.json({ message: "Removed from favorites" });
      } else {
        // Mock mode
        const index = mockFavorites.findIndex(
          (f) => f.userId === req.userId && f.productId === productId
        );
        if (index === -1) {
          res.status(404).json({ error: "Favorite not found" });
          return;
        }

        mockFavorites.splice(index, 1);
        res.json({ message: "Removed from favorites (mock mode)" });
      }
    } catch (error) {
      console.error("Remove favorite error:", error);
      res.status(500).json({ error: "Failed to remove from favorites" });
    }
  }
);

// GET /api/favorites/check/:productId - Check if product is in favorites
router.get(
  "/check/:productId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { productId } = req.params;

      if (isDBConnected()) {
        const userId = new ObjectId(req.userId);
        const prodId = new ObjectId(productId);

        const favorite = await db!.collection<Favorite>("favorites").findOne({
          userId,
          productId: prodId,
        });

        res.json({ isFavorite: !!favorite });
      } else {
        // Mock mode
        const isFavorite = mockFavorites.some(
          (f) => f.userId === req.userId && f.productId === productId
        );
        res.json({ isFavorite });
      }
    } catch (error) {
      console.error("Check favorite error:", error);
      res.status(500).json({ error: "Failed to check favorite" });
    }
  }
);

export default router;
