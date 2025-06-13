const express = require("express");
const router = express.Router();
const { Booking, User } = require("../models");


// POST /bookings
router.post("/", async (req, res) => {
  const { slotNumber, userId } = req.body;

  if (!slotNumber || !userId) {
    return res.status(400).json({ error: "slotNumber and userId are required." });
  }

  const existing = await Booking.findOne({ where: { slotNumber } });
  if (existing) {
    return res.status(409).json({ error: "Slot already reserved" });
  }

  const newBooking = await Booking.create({ slotNumber, userId });
  return res.status(201).json(newBooking);
});


// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: User });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bookings by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.userId },
      include: User,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear all bookings (admin only)
// DELETE /api/bookings/clear-all
router.delete("/clear-all", async (req, res) => {
  try {
    console.log("Clearing all bookings...");
    await Booking.destroy({ where: {}, cascade: true }); // or remove `truncate`
    res.status(200).json({ message: "All bookings cleared." });
  } catch (error) {
    console.error("❌ Error during clear-all:", error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.destroy({ where: { id: req.params.id } });
    res.json({ message: "Booking canceled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes/bookings.js
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.findAll({ include: User });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// GET /users
router.get("/users", async (req, res) => {
  const users = await User.findAll({ attributes: ["id", "username", "email"] });
  res.json(users);
});

router.put("/:id", async (req, res) => {
  const { slotNumber, userId } = req.body;
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    booking.slotNumber = slotNumber;
    booking.userId = userId;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
