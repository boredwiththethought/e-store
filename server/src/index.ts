import express, { Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDB } from "./db/mongodb.js";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import seedRoutes from "./routes/seed.js";
import favoritesRoutes from "./routes/favorites.js";
import cartRoutes from "./routes/cart.js";

// Load environment variables
dotenv.config();

const app: Application = express();

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

// Connect to MongoDB once on cold start
let dbConnected = false;
async function ensureDBConnection() {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
      console.log("✅ MongoDB connected");
    } catch (error) {
      console.error("⚠️ MongoDB connection failed:", error);
    }
  }
}

// For Vercel Serverless - ensure DB connection before handling requests
app.use(async (_req, _res, next) => {
  await ensureDBConnection();
  next();
});

// Start server (only for local development, not on Vercel)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  ensureDBConnection().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
}

// Export for Vercel Serverless
export default app;
