const Rating = require("../models/Rating");

exports.submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const user_id = req.user.id;
    await Rating.submitRating({ user_id, store_id, rating });
    res.status(200).json({ message: "Rating submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const store_id = req.params.id;
    const avg = await Rating.getAverageRating(store_id);
    res.json({ averageRating: avg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
