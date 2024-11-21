import { Schema } from "../schema"

interface IHistory {
    device: Schema.Types.ObjectId,
    ticket: Schema.Types.ObjectId,
}

export { IHistory }