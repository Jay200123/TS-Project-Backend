import Ticket from "../routes/ticket/model";
import cron from "node-cron";

const resetTickets = () => {
    cron.schedule("0 * * * *", async () => {
        const oneDay = new Date(Date.now() - 24 * 60 * 60 * 1000);

        await Ticket.updateMany(
            {
                status: "new",
                date_submitted: {
                    $lte: oneDay
                },
            },
            {
                $set: {
                    status: "pending"
                }
            }
        );
    });
};

export { resetTickets };