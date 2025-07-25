// backend/models/Rating.js
const db = require("../config/db");

class Rating {
  static async submitRating({ user_id, store_id, rating }) {
    const [existing] = await db.execute(
      "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?",
      [user_id, store_id]
    );
    if (existing.length > 0) {
      await db.execute(
        "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
        [rating, user_id, store_id]
      );
    } else {
      await db.execute(
        "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
        [user_id, store_id, rating]
      );
    }
  }

  static async getAverageRating(store_id) {
    const [rows] = await db.execute(
      "SELECT AVG(rating) as avgRating FROM ratings WHERE store_id = ?",
      [store_id]
    );
    return rows[0].avgRating;
  }
}

module.exports = Rating;
