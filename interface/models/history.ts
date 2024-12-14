import { Schema, mongoose, Types } from "../schema";
import { ITicket } from "./ticket";

interface IHistory extends Document {
    ticket: Types.ObjectId | ITicket,
    device_status: string
}

export { IHistory }