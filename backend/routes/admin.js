const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

// GET /api/admin/stats - Get total users, stores, ratings
router.get("/stats", authenticate, authorize("ADMIN"), async (req, res) => {
  try {
    const [[{ userCount }]] = await db.query("SELECT COUNT(*) as userCount FROM users");
    const [[{ storeCount }]] = await db.query("SELECT COUNT(*) as storeCount FROM stores");
    const [[{ ratingCount }]] = await db.query("SELECT COUNT(*) as ratingCount FROM ratings");
    res.json({ userCount, storeCount, ratingCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 