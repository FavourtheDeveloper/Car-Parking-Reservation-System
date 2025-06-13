// models/booking.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    slotNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isReserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Booking;
};
