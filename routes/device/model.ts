import { IDevice, Schema, model, mongoose } from "../../interface";
import { RESOURCE } from "../../constants";

const DeviceSchema: Schema<IDevice> = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    type: {
        type: String,
        enum: [
            "Printer",
            "System Unit",
            "Laptop",
            "Monitor",
            "Mobile",
            "AVR",
            "UPS",
            "Router",
            "Switch",
            "Hub",
            "Access Point",
            "Cable"
        ]
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
    serial_number: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            "Available",
            "Used",
            "Defective",
            "Repair",
            "Replacement",
            "Disposal",
            "Return"
        ],
        default: "Available"
    },
    price: {
        type: Number,
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