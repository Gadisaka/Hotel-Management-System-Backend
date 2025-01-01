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

const router = express.Router();

router.post("/new", createCustomer);
router.get("/all", getAllCustomers);
router.get("/user/:id", getCustomerById);
router.patch("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);
// router.get("/search", searchCustomerByName);
router.patch("/status/:id", changeCustomerStatus);

export default router;
