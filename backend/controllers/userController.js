// backend/controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
