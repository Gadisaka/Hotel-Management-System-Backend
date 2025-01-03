import prisma from "../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

export const createEmployee = async (req, res) => {
  const { password } = req.body;

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const employee = await prisma.employee.findUnique({
    where: {
      phone: req.body.phone,
    },
  });

  if (employee) {
    return res.status(400).json({ error: "Phone number already exists" });
  }

  try {
    const newEmployee = await prisma.employee.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });
    res.json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllEmployees = async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.json(employees);
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const employee = await prisma.employee.findMany({
    where: { id: id },
  });
  const { password, ...employeeWithoutPassword } = employee;
  res.json(employeeWithoutPassword);
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  // const { firstName, lastName, salary, role, isLoginAllowed } = req.body;

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: id },
      data: {
        ...req.body,
      },
    });
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { id: id },
    });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeByName = async (req, res) => {
  const { name } = req.body;

  const employees = await prisma.employee.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: name,
          },
        },
        {
          lastName: {
            contains: name,
          },
        },
      ],
    },
  });
  const { password, ...employeeWithoutPassword } = employee;
  res.json(employeeWithoutPassword);
};
