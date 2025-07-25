const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateOptional } = require("../middlewares/authMiddleware");

// Register user
router.post("/register", authenticateOptional, authController.register);

// Login user
router.post("/login", authController.login);

module.exports = router;
