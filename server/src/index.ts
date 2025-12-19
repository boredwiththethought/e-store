import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDB } from "./db";
import {
  authRoutes,
  productsRoutes,
  seedRoutes,
  favoritesRoutes,
  cartRoutes,
} from "./routes";

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
app.use("/api/products", productsRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/cart", cartRoutes);

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
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error(
      "⚠️ MongoDB connection failed (server will start anyway):",
      error
    );
    // Don't exit - server will work, MongoDB routes will fail gracefully
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  });
}

startServer();
