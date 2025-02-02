import cron from "node-cron";
import prisma from "../prisma/prismaClient.js";

const updateStatuses = async () => {
  try {
    console.log("Running status update job...");

    const expiredBookings = await prisma.booking.findMany({
      where: {
        endDate: {
          lt: new Date(),
        },
        status: {
          not: "COMPLETED",
        },
      },
    });

    for (const booking of expiredBookings) {
      const { id } = booking;

      await prisma.$transaction([
        // prisma.booking.update({
        //   where: { id },
        //   data: { status: "COMPLETED" },
        // }),

        // Update room status to 'active'
        // prisma.room.update({
        //   where: { id: roomId },
        //   data: { status: "active" },
        // }),

        // Update customer status to 'inactive'
        prisma.customer.update({
          where: { id: booking.customerId },
          data: { status: "INACTIVE" },
        }),
      ]);
    }

    console.log("Status update job completed.");
  } catch (error) {
    console.error("Error updating statuses:", error);
  }
};

cron.schedule("* * * * *", () => {
  updateStatuses();
});

// "* * * * *" means: "At every minute past every hour from 0 through 23."
// "*/30 * * * *" means: "At every 30th minute past every hour from 0 through 23."
// "0 0 * * *" means: "At 00:00 on every day-of-month from 1 through 31 and every month from 1 through 12."
// "0 0 * * 0" means: "At 00:00 on Sunday."
// "0 0 1 * *" means: "At 00:00 on the first day of every month."
// "0 0 1 1 *" means: "At 00:00 on the first day of January."
// "0 0 1 1 0" means: "At 00:00 on the first day of January, if it is a Sunday."
