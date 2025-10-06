const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
