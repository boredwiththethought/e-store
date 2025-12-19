import { Router, Response } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db";
import { authMiddleware, AuthRequest } from "../middleware";

const router = Router();

interface CartItem {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// GET /api/cart - Get cart for current user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const userId = new ObjectId(req.userId);

    // Get cart items with product details
    const cartItems = await db
      .collection<CartItem>("cart")
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

    // Calculate totals
    let subtotal = 0;
    const items = cartItems.map((item) => {
      const price = item.product.price || 0;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      return {
        _id: item._id?.toString(),
        productId: item.productId.toString(),
        quantity: item.quantity,
        product: {
          ...item.product,
          _id: item.product._id.toString(),
        },
        itemTotal,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });

    res.json({
      items,
      subtotal,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Failed to get cart" });
  }
});

// POST /api/cart - Add item to cart
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      res.status(400).json({ error: "Product ID is required" });
      return;
    }

    if (quantity < 1 || quantity > 99) {
      res.status(400).json({ error: "Quantity must be between 1 and 99" });
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

    const now = new Date();

    // Check if already in cart
    const existing = await db.collection<CartItem>("cart").findOne({
      userId,
      productId: prodId,
    });

    if (existing) {
      // Update quantity
      const newQuantity = Math.min(existing.quantity + quantity, 99);
      await db
        .collection<CartItem>("cart")
        .updateOne(
          { _id: existing._id },
          { $set: { quantity: newQuantity, updatedAt: now } }
        );

      res.json({
        message: "Cart updated",
        item: {
          _id: existing._id?.toString(),
          productId,
          quantity: newQuantity,
          updatedAt: now,
        },
      });
    } else {
      // Add new item
      const cartItem: CartItem = {
        userId,
        productId: prodId,
        quantity,
        createdAt: now,
        updatedAt: now,
      };

      const result = await db.collection<CartItem>("cart").insertOne(cartItem);

      res.status(201).json({
        message: "Added to cart",
        item: {
          _id: result.insertedId.toString(),
          productId,
          quantity,
          createdAt: now,
        },
      });
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// PUT /api/cart/:productId - Update cart item quantity
router.put(
  "/:productId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { productId } = req.params;
      const { quantity } = req.body;

      if (quantity === undefined || quantity < 0 || quantity > 99) {
        res.status(400).json({ error: "Quantity must be between 0 and 99" });
        return;
      }

      const db = getDB();
      const userId = new ObjectId(req.userId);
      const prodId = new ObjectId(productId);

      if (quantity === 0) {
        // Remove from cart
        await db.collection<CartItem>("cart").deleteOne({
          userId,
          productId: prodId,
        });
        res.json({ message: "Item removed from cart" });
        return;
      }

      // Update quantity
      const result = await db
        .collection<CartItem>("cart")
        .updateOne(
          { userId, productId: prodId },
          { $set: { quantity, updatedAt: new Date() } }
        );

      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Cart item not found" });
        return;
      }

      res.json({ message: "Cart updated", quantity });
    } catch (error) {
      console.error("Update cart error:", error);
      res.status(500).json({ error: "Failed to update cart" });
    }
  }
);

// DELETE /api/cart/:productId - Remove item from cart
router.delete(
  "/:productId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { productId } = req.params;

      const db = getDB();
      const userId = new ObjectId(req.userId);
      const prodId = new ObjectId(productId);

      const result = await db.collection<CartItem>("cart").deleteOne({
        userId,
        productId: prodId,
      });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Cart item not found" });
        return;
      }

      res.json({ message: "Removed from cart" });
    } catch (error) {
      console.error("Remove from cart error:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  }
);

// DELETE /api/cart - Clear entire cart
router.delete("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const db = getDB();
    const userId = new ObjectId(req.userId);

    await db.collection<CartItem>("cart").deleteMany({ userId });

    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

export default router;
