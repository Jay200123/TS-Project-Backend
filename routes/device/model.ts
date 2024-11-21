import { IDevice, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const DeviceSchema: Schema<IDevice> = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "departments",
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_requested: {
        type: Date,
        required: true
    },
    date_purchased: {
        type: Date,
        required: true
    },
    sales_invoice: {
        type: Number,
        required: true
    },
    serial_number: {
        type: String,
        required: true
    },
    image: [
        {
            public_id: String,
            url: String,
            originalname: String
        }
    ]

});

const Device = model<IDevice>(RESOURCE.DEVICE, DeviceSchema);
export default Device;  