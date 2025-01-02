import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeeByName,
  updateEmployee,
} from "../controllers/employee.controller.js";
import express from "express";
import {
  authenticateToken,
  authorizeRole,
  authorizeRoleWithExceptions,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);
// router.use(authorizeRole("ADMIN"));

// employee
router.post("/new", authorizeRole("ADMIN"), createEmployee);
router.get("/all", authorizeRole("ADMIN"), getAllEmployees);
router.get("/search", authorizeRole("ADMIN"), getEmployeeByName);
router.get(
  "/user/:id",
  authorizeRoleWithExceptions(
    ["ADMIN"],
    (req) => req.user.role === "RECEPTIONIST"
  ),
  getEmployeeById
);
router.patch(
  "/update/:id",
  authorizeRoleWithExceptions(
    ["ADMIN"],
    (req) => req.user.role === "RECEPTIONIST"
  ),
  updateEmployee
);
router.delete("/delete/:id", authorizeRole("ADMIN"), deleteEmployee);

export default router;
