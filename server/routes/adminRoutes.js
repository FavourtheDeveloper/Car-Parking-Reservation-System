const express = require("express");
const Slot = require("../models/Slot");
const { auth, adminOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/slots", auth, adminOnly, async (req, res) => {
  const slots = await Slot.find().populate("reservedBy", "username priority");
  res.json(slots);
});

router.post("/reset", auth, adminOnly, async (req, res) => {
  await Slot.updateMany({}, { isReserved: false, reservedBy: null });
  req.io.emit("slot_update", await Slot.find().populate("reservedBy", "username priority"));
  res.json({ message: "Reset all slots" });
});

module.exports = router;
