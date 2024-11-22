import { Schema, Types, mongoose } from "../schema";
import { ITicket } from "./ticket";
import { IDevice } from "./device";

type Step = "Repair" | "Replacement" | "Disposal" | "Return"; 

interface IDefective {
    ticket: Types.ObjectId | ITicket;
    device: Types.ObjectId | IDevice;
    description: string;
    date: Date;
    isRepairable: boolean;
    steps: Step;
}

export type { IDefective }