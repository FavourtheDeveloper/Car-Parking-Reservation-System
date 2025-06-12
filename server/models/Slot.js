const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({
  slotNumber: Number,
  isReserved: { type: Boolean, default: false },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
});
module.exports = mongoose.model("Slot", slotSchema);
