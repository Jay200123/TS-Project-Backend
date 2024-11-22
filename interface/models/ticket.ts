import { mongoose, Types } from "../schema";
import { Image } from "../image";
import { IDevice } from "./device";

type STATUS = "pending" | "resolved" | "in-progress" | "closed";
type Category = "hardware" | "software" | "network";
type LEVEL = "urgent" | "priority" | "non-urgent";

interface ITicket {
    device: Types.ObjectId | IDevice ;
    description: string,
    date_submitted: Date,
    date_resolved: Date,
    status: STATUS,
    category: Category,
    level: LEVEL,
    assignee: mongoose.Schema.Types.ObjectId,
    findings: string,
    image: Image[],
}

export type { ITicket };