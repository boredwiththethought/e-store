import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDB } from "../db";
import type {
  User,
  SignUpRequest,
  SignInRequest,
  UserResponse,
} from "../types";

const router = Router();
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Helper: Remove password from user response
function sanitizeUser(user: User): UserResponse {
  return {
    _id: user._id!.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
  };
}

// POST /api/auth/signup
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName }: SignUpRequest = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const db = getDB();
    const usersCollection = db.collection<User>("users");

    // Check if user exists
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const now = new Date();
    const newUser: User = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: now,
      updatedAt: now,
    };

    const result = await usersCollection.insertOne(newUser);
    newUser._id = result.insertedId;

    // Generate JWT
    const token = jwt.sign(
      { userId: result.insertedId.toString(), email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      user: sanitizeUser(newUser),
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// POST /api/auth/signin
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password }: SignInRequest = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const db = getDB();
    const usersCollection = db.collection<User>("users");

    // Find user
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id!.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Signed in successfully",
      user: sanitizeUser(user),
      token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Failed to sign in" });
  }
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const db = getDB();
    const usersCollection = db.collection<User>("users");

    // Check if user exists
    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    // Always return success (security - don't reveal if email exists)
    // In production, send email with reset link here
    if (user) {
      // TODO: Generate reset token and send email
      console.log(`Password reset requested for: ${email}`);
    }

    res.json({
      message:
        "If an account exists with this email, you will receive a password reset link",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

// GET /api/auth/me - Get current user
router.get("/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
      };

      const db = getDB();
      const { ObjectId } = await import("mongodb");
      const user = await db.collection<User>("users").findOne({
        _id: new ObjectId(decoded.userId),
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({ user: sanitizeUser(user) });
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

export default router;
