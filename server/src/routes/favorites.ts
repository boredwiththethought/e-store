import { Router, Response } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db";
import { authMiddleware, AuthRequest } from "../middleware";

const router = Router();

interface Favorite {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
}

// GET /api/favorites - Get all favorites for current user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const userId = new ObjectId(req.userId);

    // Get favorites with product details
    const favorites = await db
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

    const db = getDB();
    const userId = new ObjectId(req.userId);
    const prodId = new ObjectId(productId);

    // Check if product exists
    const product = await db.collection("products").findOne({ _id: prodId });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Check if already in favorites
    const existing = await db.collection<Favorite>("favorites").findOne({
      userId,
      productId: prodId,
    });

    if (existing) {
      res.status(400).json({ error: "Product already in favorites" });
      return;
    }

    // Add to favorites
    const favorite: Favorite = {
      userId,
      productId: prodId,
      createdAt: new Date(),
    };

    const result = await db
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

      const db = getDB();
      const userId = new ObjectId(req.userId);
      const prodId = new ObjectId(productId);

      const result = await db.collection<Favorite>("favorites").deleteOne({
        userId,
        productId: prodId,
      });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Favorite not found" });
        return;
      }

      res.json({ message: "Removed from favorites" });
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

      const db = getDB();
      const userId = new ObjectId(req.userId);
      const prodId = new ObjectId(productId);

      const favorite = await db.collection<Favorite>("favorites").findOne({
        userId,
        productId: prodId,
      });

      res.json({ isFavorite: !!favorite });
    } catch (error) {
      console.error("Check favorite error:", error);
      res.status(500).json({ error: "Failed to check favorite" });
    }
  }
);

export default router;
