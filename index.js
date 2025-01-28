import express from "express";
import cors from "cors";
import EmployeeRoutes from "./routes/employee.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import RoomRoutes from "./routes/room.routes.js";
import CustomerRoutes from "./routes/customer.routes.js";
import authRoutes from "./auth/auth.js";
import "./cron/updateStatus.js";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/employee", EmployeeRoutes);
app.use("/room", RoomRoutes);
app.use("/customer", CustomerRoutes);
app.use("/booking", bookingRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Page not found!");
  console.log("error a");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
  console.log("error b");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
