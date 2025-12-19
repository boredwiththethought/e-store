import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDB } from "./db";
import { authRoutes } from "./routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "E-Store API Server",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/api/health", async (_req: Request, res: Response) => {
  try {
    const db = getDB();
    await db.command({ ping: 1 });
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    res.json({
      status: "healthy",
      database: "disconnected",
      timestamp: new Date().toISOString(),
    });
  }
});

// Example API routes for e-store
app.get("/api/products", async (_req: Request, res: Response) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find({}).toArray();
    res.json({ products });
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const { ObjectId } = await import("mongodb");
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.json({ product });
  } catch {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: unknown) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

// Start server
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
