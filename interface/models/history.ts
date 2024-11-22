import { Schema } from "../schema"

interface IHistory {
    ticket: Schema.Types.ObjectId,
    device_status: string
}

export { IHistory }