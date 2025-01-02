import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  createMultipleRooms,
  changeRoomStatus,
} from "../controllers/room.controller.js";
import {
  authenticateToken,
  authorizeRole,
  authorizeRoleWithExceptions,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/new", authorizeRole("ADMIN"), createRoom);
router.get(
  "/all",
  authorizeRoleWithExceptions(
    ["ADMIN"],
    (req) => req.user.role === "RECEPTIONIST"
  ),
  getAllRooms
);
router.get(
  "/room/:id",
  authorizeRoleWithExceptions(
    ["ADMIN"],
    (req) => req.user.role === "RECEPTIONIST"
  ),
  getRoomById
);
router.patch(
  "/update/:id",
  authorizeRoleWithExceptions(
    ["ADMIN"],
    (req) => req.user.role === "RECEPTIONIST"
  ),
  updateRoom
);
router.delete("/delete/:id", authorizeRole("ADMIN"), deleteRoom);
router.post("/multiple", authorizeRole("ADMIN"), createMultipleRooms);
router.patch(
  "/status/:id",
  authorizeRoleWithExceptions(
    ["ADMIN"],
    (req) => req.user.role === "RECEPTIONIST"
  ),
  changeRoomStatus
);

export default router;

// RECEPTIONIST
