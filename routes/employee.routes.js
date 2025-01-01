import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeeByName,
  updateEmployee,
} from "../controllers/employee.controller.js";
import express from "express";

const router = express.Router();

// employee
router.post("/new", createEmployee);
router.get("/all", getAllEmployees);
router.get("/search", getEmployeeByName);
router.get("/user/:id", getEmployeeById);
router.patch("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
