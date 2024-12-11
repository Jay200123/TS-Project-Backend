import { Schema, model, mongoose, ITicket } from "../../interface";
import { RESOURCE } from "../../constants";

const ticketSchema: Schema<ITicket> = new Schema({
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.DEVICE
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
        enum: ["new", "pending", "resolved", "in-progress", "closed"],
        default: "new"
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
        type: mongoose.Schema.Types.ObjectId,
        ref: RESOURCE.USERS
    },
    findings: {
        type: String,
        default: null
    },
    counter: {
        type: Number,
        default: 0,
    },
    ticketNumber: {
        type: String,
        required: true,
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