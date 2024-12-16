import { model, Schema, mongoose } from "../../interface";
import { IBorrow } from "../../interface";
import { RESOURCE } from "../../constants";

const borrowSchema: Schema<IBorrow> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  lender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "equipments",
  },
  serial_number: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  borrow_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  return_date: {
    type: Date,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["returned", "borrowed", "returned damaged", "lost"],
    default: "borrowed",
  },
  counter: {
    type: Number,
    default: 0,
  },
  borrowNumber: {
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});

const Borrow = model<IBorrow>(RESOURCE.BORROW, borrowSchema);
export default Borrow;
