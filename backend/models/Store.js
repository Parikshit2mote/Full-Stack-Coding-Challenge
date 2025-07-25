const db = require("../config/db");

class Store {
  static async create({ name, email, address, owner_id }) {
    const [result] = await db.execute(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, owner_id]
    );
    return result.insertId;
  }

  static async findAll(filters = {}) {
    let query =
      "SELECT s.*, AVG(r.rating) as rating FROM stores s LEFT JOIN ratings r ON s.id = r.store_id WHERE 1=1";
    const params = [];
    if (filters.name) {
      query += " AND s.name LIKE ?";
      params.push(`%${filters.name}%`);
    }
    if (filters.address) {
      query += " AND s.address LIKE ?";
      params.push(`%${filters.address}%`);
    }
    query += " GROUP BY s.id";
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async getRatingsByStoreId(storeId) {
    const [rows] = await db.execute(
      `SELECT u.name, u.email, r.rating FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = ?`,
      [storeId]
    );
    return rows;
  }
}

module.exports = Store;
