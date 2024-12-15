import { IEquipment, Schema, model } from "../../interface";
import { RESOURCE } from "../../constants";

const equipmentSchema: Schema<IEquipment> = new Schema({
  equipment_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },

  borrowedQuantity: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: String,
      url: String,
      originalname: String,
    },
  ],
});

const Equipment = model<IEquipment>(RESOURCE.EQUIPMENT, equipmentSchema);
export default Equipment;
