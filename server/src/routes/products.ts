import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../db/mongodb";
import type {
  Product,
  ProductCategory,
  ProductFilters,
  PaginationOptions,
  PaginatedResult,
} from "../types/product";

const router = Router();

// GET /api/products - Get all products with filters and pagination
router.get("/", async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");

    // Parse query parameters
    const {
      category,
      subcategory,
      brand,
      priceMin,
      priceMax,
      inStock,
      colors,
      search,
      page = "1",
      limit = "20",
      sort = "name",
      order = "asc",
      ...filterSpecs
    } = req.query;

    // Build filter query
    const filter: Record<string, unknown> = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (brand) filter.brand = brand;
    if (inStock !== undefined) filter.inStock = inStock === "true";

    // Price range
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin)
        (filter.price as Record<string, number>).$gte = Number(priceMin);
      if (priceMax)
        (filter.price as Record<string, number>).$lte = Number(priceMax);
    }

    // Colors filter (array contains any of)
    if (colors) {
      const colorArray = Array.isArray(colors) ? colors : [colors];
      filter.colors = { $in: colorArray };
    }

    // Text search
    if (search) {
      filter.$text = { $search: search as string };
    }

    // Filter specs (dynamic filters)
    for (const [key, value] of Object.entries(filterSpecs)) {
      if (key.startsWith("filter_")) {
        const specKey = key.replace("filter_", "");
        filter[`filterSpecs.${specKey}`] = isNaN(Number(value))
          ? value
          : Number(value);
      }
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Sort
    const sortField = sort as string;
    const sortOrder = order === "desc" ? -1 : 1;
    const sortQuery = { [sortField]: sortOrder };

    // Execute query
    const [products, total] = await Promise.all([
      collection
        .find(filter)
        .sort(sortQuery as Record<string, 1 | -1>)
        .skip(skip)
        .limit(limitNum)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    const result: PaginatedResult<Product> = {
      data: products,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /api/products/categories - Get all categories with counts
router.get("/categories", async (_req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");

    const categories = await collection
      .aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    res.json(
      categories.map((c) => ({
        category: c._id,
        count: c.count,
      }))
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /api/products/brands - Get all brands with counts
router.get("/brands", async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");

    const { category } = req.query;
    const match = category ? { category } : {};

    const brands = await collection
      .aggregate([
        { $match: match },
        { $group: { _id: "$brand", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    res.json(
      brands.map((b) => ({
        brand: b._id,
        count: b.count,
      }))
    );
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

// GET /api/products/filters/:category - Get available filter values for a category
router.get("/filters/:category", async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");
    const { category } = req.params;

    const products = await collection
      .find({ category: category as ProductCategory })
      .toArray();

    // Aggregate filter values
    const filters: Record<string, Set<unknown>> = {
      brands: new Set(),
      colors: new Set(),
      priceMin: new Set([Math.min(...products.map((p) => p.price))]),
      priceMax: new Set([Math.max(...products.map((p) => p.price))]),
    };

    // Collect unique values
    for (const product of products) {
      filters.brands.add(product.brand);
      product.colors.forEach((c) => filters.colors.add(c));

      // Collect filterSpecs values
      if (product.filterSpecs) {
        for (const [key, value] of Object.entries(product.filterSpecs)) {
          if (!filters[key]) filters[key] = new Set();
          if (Array.isArray(value)) {
            value.forEach((v) => filters[key].add(v));
          } else {
            filters[key].add(value);
          }
        }
      }
    }

    // Convert Sets to arrays
    const result: Record<string, unknown[]> = {};
    for (const [key, value] of Object.entries(filters)) {
      result[key] = Array.from(value).sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
});

// GET /api/products/:id - Get single product by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");
    const { id } = req.params;

    // Try to find by custom id first, then by MongoDB _id
    let product = await collection.findOne({ id });

    if (!product && ObjectId.isValid(id)) {
      product = await collection.findOne({ _id: new ObjectId(id) });
    }

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// GET /api/products/related/:id - Get related products
router.get("/related/:id", async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string, 10) || 4;

    const product = await collection.findOne({ id });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    // Find related products (same category and brand, excluding current)
    const related = await collection
      .find({
        id: { $ne: id },
        $or: [
          { category: product.category, brand: product.brand },
          { category: product.category },
        ],
      })
      .limit(limit)
      .toArray();

    res.json(related);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ error: "Failed to fetch related products" });
  }
});

// POST /api/products/search - Advanced search
router.post("/search", async (req: Request, res: Response) => {
  try {
    const db = getDB();
    const collection = db.collection<Product>("products");

    const { query, filters, pagination } = req.body as {
      query?: string;
      filters?: ProductFilters;
      pagination?: PaginationOptions;
    };

    const filter: Record<string, unknown> = {};

    // Text search
    if (query) {
      filter.$text = { $search: query };
    }

    // Apply filters
    if (filters) {
      if (filters.category) filter.category = filters.category;
      if (filters.brand) filter.brand = filters.brand;
      if (filters.inStock !== undefined) filter.inStock = filters.inStock;
      if (filters.priceMin || filters.priceMax) {
        filter.price = {};
        if (filters.priceMin)
          (filter.price as Record<string, number>).$gte = filters.priceMin;
        if (filters.priceMax)
          (filter.price as Record<string, number>).$lte = filters.priceMax;
      }
    }

    // Pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 20;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      collection.find(filter).skip(skip).limit(limit).toArray(),
      collection.countDocuments(filter),
    ]);

    res.json({
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Failed to search products" });
  }
});

export default router;
