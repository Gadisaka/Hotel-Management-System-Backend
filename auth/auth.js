import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prismaClient.js";

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body; // Role is sent from the frontend

  try {
    // Find user by username
    const user = await prisma.employee.findUnique({
      where: { username },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password." });

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid username or password." });

    // Check role
    if (user.role !== role) {
      return res
        .status(403)
        .json({ message: `Access denied. You are not authorized as ${role}.` });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.set("Authorization", `Bearer ${token}`);
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.production,
      sameSite: "strict",
    });
    res.status(200).json({
      message: `Logged in successfully as ${role}`,
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error });
  }
});

router.post("/signout", (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user logged out", status: "success" });
  } catch (error) {
    next(error);
  }
});

export default router;
