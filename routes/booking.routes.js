import express from "express";
import {
  changeStatus,
  checkOut,
  createBooking,
  deleteBooking,
  getAllBookings,
  getById,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.get("/all", getAllBookings);
router.post("/new", createBooking);
router.get("/:id", getById);
router.patch("/update/:id", changeStatus);
router.delete("/delete/:id", deleteBooking);
router.patch("/checkout/:id", checkOut);

export default router;
