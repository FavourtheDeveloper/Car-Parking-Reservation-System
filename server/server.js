const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const slotRoutes = require("./routes/slotRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use((req, res, next) => { req.io = io; next(); });
app.use("/api/auth", authRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/admin", adminRoutes);

io.on("connection", socket => {
  console.log("User connected");
});

server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
