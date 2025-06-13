const express = require("express");
const router = express.Router();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // Ideally hashed or stored in env vars

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ admin: { username } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
