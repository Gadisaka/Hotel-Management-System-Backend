import express from "express";
import {
  changeStatus,
  checkOut,
  createBooking,
  deleteBooking,
  getAllBookings,
  getById,
} from "../controllers/booking.controller.js";
import {
  authenticateToken,
  authorizeRole,
  authorizeRoleWithExceptions,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);

router.get(
  "/all",
  authorizeRoleWithExceptions(
    ["RECEPTIONIST"],
    (req) => req.user.role === "ADMIN"
  ),
  getAllBookings
);
router.post("/new", authorizeRole("RECEPTIONIST"), createBooking);
router.get(
  "/:id",
  authorizeRoleWithExceptions(
    ["RECEPTIONIST"],
    (req) => req.user.role === "ADMIN"
  ),
  getById
);
router.patch("/update/:id", authorizeRole("RECEPTIONIST"), changeStatus);
router.delete("/delete/:id", authorizeRole("RECEPTIONIST"), deleteBooking);
router.patch("/checkout/:id", authorizeRole("RECEPTIONIST"), checkOut);

export default router;
