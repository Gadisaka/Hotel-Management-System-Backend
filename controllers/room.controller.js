import prisma from "../prisma/prismaClient.js";

export const createRoom = async (req, res) => {
  //check if room number already exists
  const { number, floor, type, price, status } = req.body;

  const room = await prisma.room.findUnique({
    where: {
      number: number,
    },
  });

  if (room) {
    return res.status(400).json({ error: "Room number already exists" });
  }

  try {
    const newRoom = await prisma.room.create({
      data: {
        number,
        floor,
        type,
        price,
        status,
      },
    });
    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating room", message: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
};

export const getRoomById = async (req, res) => {
  const { id } = req.params;
  const room = await prisma.room.findMany({
    where: { id: id },
  });
  res.json(room);
};

export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { type, price, status } = req.body;

  try {
    const updatedRoom = await prisma.room.update({
      where: { id: id },
      data: {
        type,
        price,
        status,
      },
    });
    res.json(updatedRoom);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error updating room" });
  }
};

export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.room.delete({
      where: { id: id },
    });
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error deleting room" });
  }
};

export const createMultipleRooms = async (req, res) => {
  const { startNumber, floor, type, price, count, status } = req.body;

  // check if there won't be any room number conflicts
  const existingRooms = await prisma.room.findMany({
    where: {
      OR: [
        {
          number: {
            in: Array.from(
              { length: count },
              (_, index) => startNumber + index
            ),
          },
        },
      ],
    },
  });

  if (existingRooms.length > 0) {
    return res.status(400).json({
      error: "Room number conflict",
      message: "Room number already exists",
    });
  }

  try {
    // Begin a transaction to ensure all inserts succeed or rollback
    await prisma.$transaction(
      async (prisma) => {
        const roomPromises = Array.from({ length: count }, (_, index) =>
          prisma.room.create({
            data: {
              number: startNumber + index,
              floor,
              type,
              price,
              status,
            },
          })
        );

        // Create all rooms in parallel
        await Promise.all(roomPromises);
      },
      { timeout: 30000 }
    );

    res.json({ message: `${count} rooms created successfully!` });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Error creating multiple rooms" });
  }
};

//to update room status when occupied , reserved or active
export const changeRoomStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const roomStatus = await prisma.room.update({
      where: { id: id },
      data: { status },
    });
    res.json({ roomStatus, message: "Room status changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message, message: "Error updating room status" });
  }
};
