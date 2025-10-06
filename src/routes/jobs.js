const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// Protected route
router.get("/", auth, (req, res) => {
  res.json({ msg: "Welcome, you are authorized!", userId: req.user });
});

module.exports = router;
