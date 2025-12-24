import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import type {
  User,
  SignUpRequest,
  SignInRequest,
  UserResponse,
} from "../types";

const router = Router();
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// In-memory users for development when MongoDB is unavailable
interface MockUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
const mockUsers: Map<string, MockUser> = new Map();

function isDBConnected(): boolean {
  return db !== null;
}

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

    const emailLower = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 12);
    const now = new Date();

    if (isDBConnected()) {
      // MongoDB available
      const usersCollection = db!.collection<User>("users");

      const existingUser = await usersCollection.findOne({ email: emailLower });
      if (existingUser) {
        res.status(400).json({ error: "User with this email already exists" });
        return;
      }

      const newUser: User = {
        email: emailLower,
        password: hashedPassword,
        firstName,
        lastName,
        createdAt: now,
        updatedAt: now,
      };

      const result = await usersCollection.insertOne(newUser);
      const token = jwt.sign(
        { userId: result.insertedId.toString(), email: emailLower },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        message: "User created successfully",
        user: sanitizeUser({ ...newUser, _id: result.insertedId }),
        token,
      });
    } else {
      // Mock mode - use in-memory storage
      if (mockUsers.has(emailLower)) {
        res.status(400).json({ error: "User with this email already exists" });
        return;
      }

      const mockId = `mock-${Date.now()}`;
      const mockUser = {
        _id: mockId,
        email: emailLower,
        password: hashedPassword,
        firstName,
        lastName,
        createdAt: now,
        updatedAt: now,
      };

      mockUsers.set(emailLower, mockUser);

      const token = jwt.sign(
        { userId: mockId, email: emailLower },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        message: "User created successfully (mock mode)",
        user: {
          _id: mockId,
          email: emailLower,
          firstName,
          lastName,
          createdAt: now,
        },
        token,
      });
    }
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

    const emailLower = email.toLowerCase();

    if (isDBConnected()) {
      // MongoDB available
      const usersCollection = db!.collection<User>("users");

      const user = await usersCollection.findOne({ email: emailLower });
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

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
    } else {
      // Mock mode
      const mockUser = mockUsers.get(emailLower);
      if (!mockUser) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, mockUser.password);
      if (!isValidPassword) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const token = jwt.sign(
        { userId: mockUser._id, email: mockUser.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        message: "Signed in successfully (mock mode)",
        user: {
          _id: mockUser._id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          createdAt: mockUser.createdAt,
        },
        token,
      });
    }
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

    const emailLower = email.toLowerCase();

    if (isDBConnected()) {
      const usersCollection = db!.collection<User>("users");
      const user = await usersCollection.findOne({ email: emailLower });
      if (user) {
        console.log(`Password reset requested for: ${email}`);
      }
    } else {
      // Mock mode - just log
      if (mockUsers.has(emailLower)) {
        console.log(`Password reset requested for (mock): ${email}`);
      }
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

      if (isDBConnected()) {
        const { ObjectId } = await import("mongodb");
        const user = await db!.collection<User>("users").findOne({
          _id: new ObjectId(decoded.userId),
        });

        if (!user) {
          res.status(404).json({ error: "User not found" });
          return;
        }

        res.json({ user: sanitizeUser(user) });
      } else {
        // Mock mode
        const mockUser = mockUsers.get(decoded.email);
        if (!mockUser || mockUser._id !== decoded.userId) {
          res.status(404).json({ error: "User not found" });
          return;
        }

        res.json({
          user: {
            _id: mockUser._id,
            email: mockUser.email,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            createdAt: mockUser.createdAt,
          },
        });
      }
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

export default router;
