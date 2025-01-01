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

const router = express.Router();

router.post("/new", createRoom);
router.get("/all", getAllRooms);
router.get("/room/:id", getRoomById);
router.patch("/update/:id", updateRoom);
router.delete("/delete/:id", deleteRoom);
router.post("/multiple", createMultipleRooms);
router.patch("/status/:id", changeRoomStatus);

export default router;
