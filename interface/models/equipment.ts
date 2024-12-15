import { Document } from "../schema";
import { Image } from "../image";

interface IEquipment extends Document {    
    equipment_name: string;
    brand: string;
    price: number;
    quantity: number; 
    borrowedQuantity: number; 
    damagedQuantity: number;    
    lostQuantity: number; 
    image: Image[];
}

export type { IEquipment };