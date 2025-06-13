const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const { sequelize } = require('./models');


sequelize.sync({ alter: true }) // `alter: true` adjusts table to match model
  .then(() => console.log('Database synced successfully'))
  .catch((err) => console.error('Database sync error:', err));


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/admin", require("./routes/admin")); // adjust path if needed


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
