import { Schema, model } from "../../interface";
import { IDefective } from "../../interface";
import { RESOURCE } from "../../constants";

const defectiveSchema: Schema<IDefective> = new Schema({
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "tickets",
        required: true
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: "devices",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isRepairable: {
        type: Boolean,
        required: true
    },
    steps: {
        type: String,
        enum: ["Repair", "Replacement", "Disposal", "Return"],
        required: true
    }
});

const Defective = model<IDefective>(RESOURCE.DEFECTIVE, defectiveSchema);
export default Defective;