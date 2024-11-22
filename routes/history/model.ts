import { Schema, model } from "../../interface";
import { IHistory } from "../../interface/";
import { RESOURCE } from "../../constants";

const historySchema: Schema<IHistory> = new Schema({
    ticket: {
        type: Schema.Types.ObjectId,
        ref: RESOURCE.TICKET
    },
    device_status: {
        type: String,
        required: true
    }
});

const History = model<IHistory>(RESOURCE.HISTORY, historySchema);
export default History;