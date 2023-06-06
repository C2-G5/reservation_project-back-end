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
const adminHotel = require('./routes/admin-router/hotel_routes')
const adminRome = require('./routes/admin-router/room-routes')
const adminUsers = require('./routes/admin-router/Users-routes')
const bookingRoutes = require('./routes/booking-routes')
const contact = require("./routes/contactUs-routes");


app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/rooms", rooms);
app.use("/hotels", hotels);
app.use("/payment", payment);
app.use("/admin/hotel",adminHotel);
app.use("/admin/rooms",adminRome );
app.use("/admin/users",adminUsers );
app.use("/booking",bookingRoutes );
app.use("/contact", contact);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
