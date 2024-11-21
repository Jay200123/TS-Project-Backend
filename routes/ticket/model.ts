import { Schema, model, ITicket } from "../../interface";
import { RESOURCE } from "../../constants";

const ticketSchema: Schema<ITicket> = new Schema({
    device: {
        type: Schema.Types.ObjectId,
        ref: RESOURCE.DEVICE
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: RESOURCE.USERS
    },
    description: {
        type: String,
        required: true
    },
    date_submitted: {
        type: Date,
        required: true,
        default: Date.now
    },
    date_resolved: {
        type: Date
    },
    status: {
        type: String,
        enum: ["pending", "resolved", "in-progress", "closed"],
        default: "pending"
    },
    category: {
        type: String,
        enum: ["hardware", "software", "network"],
        required: true
    },
    level: {
        type: String,
        enum: ["urgent", "priority", "non-urgent"],
        default: "non-urgent"
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: RESOURCE.USERS
    },
    findings: {
        type: String
    },
    image: [
        {
            public_id: String,
            url: String,
            originalname: String,
        }
    ]
});
const Ticket = model<ITicket>(RESOURCE.TICKET, ticketSchema);
export default Ticket;