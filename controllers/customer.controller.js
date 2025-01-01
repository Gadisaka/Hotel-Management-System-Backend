import prisma from "../prisma/prismaClient.js";

export const createCustomer = async (req, res) => {
  const existingCustomer = await prisma.customer.findFirst({
    where: {
      phone: req.body.phone,
    },
  });

  if (existingCustomer) {
    return res.status(400).json({ error: "Phone number already exists" });
  }

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error creating customer" });
  }
};

export const getAllCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  const customer = await prisma.customer.findMany({
    where: { id: id },
  });
  res.json(customer);
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: id },
      data: {
        ...req.body,
      },
    });
    res.json(updatedCustomer);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error updating customer" });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.customer.delete({
      where: { id: id },
    });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error deleting customer" });
  }
};

export const changeCustomerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: id },
      data: {
        status,
      },
    });
    res.status(201).json({
      message: "Customer status changed successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error updating customer status",
    });
  }
};

// export const searchCustomerByName = async (req, res) => {
//   const { name } = req.body;
//   try {
//     const customer = await prisma.customer.findMany({
//       where: {
//         firstName: {
//           contains: name,
//         },
//         lastName: {
//           contains: name,
//         },
//       },
//     });
//     if (!customer.length) {
//       return res.status(500).json({ message: "Customer not found" });
//     }
//     res.status(201).json(customer);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: error.message, message: "Error searching customer" });
//   }
// };
