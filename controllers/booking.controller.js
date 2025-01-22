import prisma from "../prisma/prismaClient.js";

export const createBooking = async (req, res) => {
  const { customer, room, startDate, endDate, payment } = req.body;

  const isRoomTaken = await prisma.booking.findFirst({
    where: {
      roomId: room,
    },
  });
  if (isRoomTaken) {
    return res.status(409).json({ message: "room is already taken" });
  }

  const isRoomUnavailable = await prisma.room.findFirst({
    where: {
      id: room,
      status: "AVAILABLE",
    },
  });

  if (!isRoomUnavailable) {
    return res.status(404).json({ message: "room is currently unavailable" });
  }

  try {
    const newBooking = await prisma.booking.create({
      data: {
        customer: {
          connect: {
            id: customer,
          },
        },
        room: {
          connect: {
            id: room,
          },
        },
        startDate,
        endDate,
        payment,
        status: "CONFIRMED",
      },
    });

    const theroom = await prisma.room.update({
      where: {
        id: room,
      },
      data: {
        status: "OCCUPIED",
      },
    });

    const thecustomer = await prisma.customer.update({
      where: {
        id: customer,
      },
      data: {
        status: "ACTIVE",
      },
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
      room: theroom,
      customer: thecustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error creating booking" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany();
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const room = await prisma.room.findFirst({
          where: {
            id: booking.roomId,
          },
        });
        const customer = await prisma.customer.findFirst({
          where: {
            id: booking.customerId,
          },
        });
        const fullName = customer.firstName + " " + customer.lastName;
        return {
          ...booking,
          roomNumber: room.number,
          customerName: fullName,
        };
      })
    );
    res.json({ bookings: bookingsWithDetails });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error fetching bookings" });
  }
};

export const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
      },
    });
    if (!booking) {
      return res.status(400).json({ message: "booking unavailable" });
    }
    res.status(201).json({ message: "booking found", booking: booking });
  } catch (error) {
    res.status(500).json({ error: error, message: "booking unavailable" });
  }
};

export const changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
        updatedAt: {
          status: status,
        },
      },
    });

    if (!booking) {
      return res.status(400).json({
        message: "booking unavailable",
      });
    }
    res.status(201).json({
      message: "status changed successfull",
      booking: booking,
      customer: booking.customer,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "error changing status" });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const isConfirmed = await prisma.booking.findFirst({
      where: {
        id: id,
        status: "CONFIRMED",
      },
    });
    if (isConfirmed) {
      return res.status(400).json({
        message:
          "booking must be pending , cancelled or completed to be deleted",
      });
    }

    await prisma.booking.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json({ message: "booking deleted successfull" });
  } catch (err) {
    req.status(500).json({ message: "error deleting booking ", error: err });
  }
};

export const checkOut = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: id,
        updatedAt: {
          status: "COMPLETED",
        },
      },
    });

    res.status(201).json({ message: "booking checkout successfull" });
  } catch (err) {
    req.status(500).json({ message: "error checkout booking ", error: err });
  }
};
