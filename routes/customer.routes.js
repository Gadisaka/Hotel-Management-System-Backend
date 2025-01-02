import express from "express";
import {
  changeCustomerStatus,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  // searchCustomerByName,
  updateCustomer,
} from "../controllers/customer.controller.js";
import {
  authenticateToken,
  authorizeRole,
  authorizeRoleWithExceptions,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/new", authorizeRole("RECEPTIONIST"), createCustomer);
router.get(
  "/all",
  authorizeRoleWithExceptions(
    ["RECEPTIONIST"],
    (req) => req.user.role === "ADMIN"
  ),
  getAllCustomers
);
router.get(
  "/user/:id",
  authorizeRoleWithExceptions(
    ["RECEPTIONIST"],
    (req) => req.user.role === "ADMIN"
  ),
  getCustomerById
);
router.patch("/update/:id", authorizeRole("RECEPTIONIST"), updateCustomer);
router.delete("/delete/:id", authorizeRole("RECEPTIONIST"), deleteCustomer);
// router.get("/search", searchCustomerByName);
router.patch(
  "/status/:id",
  authorizeRole("RECEPTIONIST"),
  changeCustomerStatus
);

export default router;
