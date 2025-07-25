// backend/routes/stores.js
const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.get("/", authenticate, storeController.getAllStores);
router.post("/", authenticate, authorize("ADMIN"), storeController.createStore);
router.get(
  "/:id/ratings",
  authenticate,
  authorize("OWNER"),
  storeController.getStoreRatings
);

module.exports = router;
