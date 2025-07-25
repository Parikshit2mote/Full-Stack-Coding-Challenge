const db = require("../config/db");

class User {
  static async create({ name, email, password, address, role }) {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, address, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async findAll(filters = {}) {
    let query = "SELECT * FROM users WHERE 1=1";
    const params = [];
    if (filters.name) {
      query += " AND name LIKE ?";
      params.push(`%${filters.name}%`);
    }
    if (filters.email) {
      query += " AND email LIKE ?";
      params.push(`%${filters.email}%`);
    }
    if (filters.address) {
      query += " AND address LIKE ?";
      params.push(`%${filters.address}%`);
    }
    if (filters.role) {
      query += " AND role = ?";
      params.push(filters.role);
    }
    const [rows] = await db.execute(query, params);
    return rows;
  }
}

module.exports = User;
