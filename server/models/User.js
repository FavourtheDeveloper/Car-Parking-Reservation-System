const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
module.exports = mongoose.model("User", userSchema);
