import { Router, Request, Response } from "express";
import { getDB } from "../db/mongodb";
import type { Product } from "../types/product";
import * as fs from "fs";
import * as path from "path";

const router = Router();

// GET /api/seed - Import all products from JSON files to MongoDB
router.get("/", async (req: Request, res: Response) => {
  try {
    const secretKey = req.query.key as string;

    // Simple protection - requires secret key
    if (secretKey !== process.env.SEED_SECRET_KEY) {
      res.status(401).json({ error: "Unauthorized. Provide valid key." });
      return;
    }

    const db = getDB();
    const productsCollection = db.collection<Product>("products");

    // Path to products folder
    const dataPath = path.join(process.cwd(), "data", "products");

    if (!fs.existsSync(dataPath)) {
      res.status(404).json({ error: "Products data folder not found" });
      return;
    }

    const categories = [
      "phones",
      "smartwatches",
      "cameras",
      "headphones",
      "computers",
      "gaming",
    ];
    const products: Product[] = [];

    // Recursively find all JSON files
    const findJsonFiles = (dir: string): string[] => {
      const files: string[] = [];
      if (!fs.existsSync(dir)) return files;

      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...findJsonFiles(fullPath));
        } else if (item.endsWith(".json")) {
          files.push(fullPath);
        }
      }

      return files;
    };

    for (const category of categories) {
      const categoryPath = path.join(dataPath, category);
      const jsonFiles = findJsonFiles(categoryPath);

      for (const file of jsonFiles) {
        try {
          const content = fs.readFileSync(file, "utf-8");
          const product = JSON.parse(content) as Product;
          products.push({
            ...product,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } catch (e) {
          console.error(`Error parsing ${file}:`, e);
        }
      }
    }

    if (products.length === 0) {
      res.json({ success: false, message: "No products found to import" });
      return;
    }

    // Clear existing products and insert new ones
    const deleteResult = await productsCollection.deleteMany({});
    const insertResult = await productsCollection.insertMany(products);

    // Create indexes
    await productsCollection.createIndex({ id: 1 }, { unique: true });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ brand: 1 });
    await productsCollection.createIndex({ price: 1 });
    await productsCollection.createIndex(
      { name: "text", description: "text" },
      { default_language: "english" }
    );

    // Count by category
    const categoryStats = categories.reduce(
      (acc, cat) => {
        acc[cat] = products.filter((p) => p.category === cat).length;
        return acc;
      },
      {} as Record<string, number>
    );

    res.json({
      success: true,
      message: `Imported ${insertResult.insertedCount} products`,
      deleted: deleteResult.deletedCount,
      inserted: insertResult.insertedCount,
      categories: categoryStats,
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ error: "Failed to seed database" });
  }
});

export default router;
