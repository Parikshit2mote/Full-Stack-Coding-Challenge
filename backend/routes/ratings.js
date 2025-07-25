// backend/routes/ratings.js
const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post(
  "/",
  authenticate,
  authorize("USER"),
  ratingController.submitRating
);
router.get("/:id", authenticate, ratingController.getAverageRating);

module.exports = router;
