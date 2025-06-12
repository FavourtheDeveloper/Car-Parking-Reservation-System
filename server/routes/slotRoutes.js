const express = require("express");
const Slot = require("../models/Slot");
const { auth } = require("../middleware/auth");
const router = express.Router();

const isPeakHour = () => {
  const h = new Date().getHours();
  return h >= 8 && h <= 10;
};

router.get("/", auth, async (req, res) => {
  const slots = await Slot.find().populate("reservedBy", "username priority");
  res.json(slots);
});

router.post("/book", auth, async (req, res) => {
  const { slotId } = req.body;
  const slot = await Slot.findById(slotId);
  if (!slot || slot.isReserved)
    return res.status(400).json({ message: "Slot unavailable" });
  if (isPeakHour() && req.user.priority !== "high")
    return res.status(403).json({ message: "High-priority only during peak hours" });

  slot.isReserved = true;
  slot.reservedBy = req.user._id;
  await slot.save();

  req.io.emit("slot_update", await Slot.find().populate("reservedBy", "username priority"));
  res.json({ message: "Reserved", slot });
});

router.post("/cancel", auth, async (req, res) => {
  const { slotId } = req.body;
  const slot = await Slot.findById(slotId);
  if (!slot?.isReserved || !slot.reservedBy.equals(req.user._id))
    return res.status(403).json({ message: "Cannot cancel" });

  slot.isReserved = false;
  slot.reservedBy = null;
  await slot.save();

  req.io.emit("slot_update", await Slot.find().populate("reservedBy", "username priority"));
  res.json({ message: "Cancelled" });
});

module.exports = router;
