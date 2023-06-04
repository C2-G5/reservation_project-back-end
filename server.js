require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;
const router = express.Router();
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const rooms = require("./routes/RoomDetails");
const hotels = require("./routes/HotelDetails");
const payment = require("./routes/Payment");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/rooms", rooms);
app.use("/hotels", hotels);
app.use("/payment", payment);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
