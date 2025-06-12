const mongoose = require("mongoose");
const Slot = require("./models/Slot");
require("dotenv").config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Slot.deleteMany({});
  for (let i = 1; i <= 20; i++) await Slot.create({ slotNumber: i });
  console.log("Seeded 20 slots");
  process.exit();
})();
