import { Document, mongoose } from "../schema";
import { Image } from "../image";

type Type =
    "Printer"
    | "System Unit"
    | "Laptop"
    | "Monitor"
    | "Mobile"
    | "AVR"
    | "UPS"
    | "Router"
    | "Switch"
    | "Hub"
    | "Access Point"
    | "Cable"

type STATUS = "Available" | "Use" | "Repair" | "Replacement"| "Disposal" | "Return";

interface IDevice extends Document {
    owner: mongoose.Types.ObjectId,
    department: mongoose.Types.ObjectId,
    type: Type,
    description: String,
    date_requested: Date,
    date_purchased: Date,
    sales_invoice: Number,
    serial_number: String,
    status: STATUS, 
    image: Image[]
};

export type { IDevice };