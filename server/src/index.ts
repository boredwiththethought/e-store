import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "E-Store API Server",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Example API routes for e-store
app.get("/api/products", (req: Request, res: Response) => {
  // TODO: Implement product listing
  res.json({
    products: [],
    message: "Products endpoint - to be implemented",
  });
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  // TODO: Implement product details
  const { id } = req.params;
  res.json({
    productId: id,
    message: "Product details endpoint - to be implemented",
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
});
