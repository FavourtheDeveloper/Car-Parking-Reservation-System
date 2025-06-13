// seedBookings.js
const db = require('./models');

(async () => {
  await db.sequelize.sync();

  const user = await db.User.findOne(); // gets first user

  if (user) {
    await db.Booking.create({
      slotNumber: 1,
      userId: user.id,
      isReserved: true,
    });

    await db.Booking.create({
      slotNumber: 2,
      userId: user.id,
      isReserved: true,
    });

    console.log("Dummy bookings added");
  } else {
    console.log("No user found. Please seed users first.");
  }

  process.exit();
})();
