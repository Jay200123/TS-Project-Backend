import { Document, mongoose, } from "../schema";
import { Image } from "../image";
import { IUser } from "./user";

type Type =
  | "Printer"
  | "System Unit"
  | "Laptop"
  | "Monitor"
  | "Mobile"
  | "Keyboard"
  | "Mouse"
  | "AVR"
  | "UPS"
  | "Router"
  | "Switch"
  | "Hub"
  | "Access Point"
  | "Cable";

type STATUS =
  | "Available"
  | "Used"
  | "Repair"
  | "Replacement"
  | "Disposal"
  | "Return";

interface IDevice extends Document {
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId | IUser;
  type: Type;
  description: String;
  date_requested: Date;
  date_purchased: Date;
  serial_number: String;
  price: Number;
  status: STATUS;
  image: Image[];
}

export type { IDevice };
