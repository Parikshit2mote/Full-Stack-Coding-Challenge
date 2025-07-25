const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let userRole = "USER";
    // Only allow ADMIN or OWNER if the requester is an admin
    if ((role === "ADMIN" || role === "OWNER") && req.user && req.user.role === "ADMIN") {
      userRole = role;
    } else if (!role || role === "USER") {
      userRole = "USER";
    } else if (role === "ADMIN" || role === "OWNER") {
      // Not allowed to create admin/owner unless requester is admin
      return res.status(403).json({ message: "Only admins can create admin or owner accounts." });
    }
    const id = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: userRole,
    });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
