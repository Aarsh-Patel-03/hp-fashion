import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

/* ================= ADMIN LOGIN ================= */
router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    // Check credentials
    if (
      (username === process.env.ADMIN_USERNAME || "HpFashion") &&
      (password === process.env.ADMIN_PASSWORD || "HpFashionAdmin@123")
    ) {
      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        success: true,
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
