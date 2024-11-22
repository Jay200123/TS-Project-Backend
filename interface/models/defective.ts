import { Schema } from "../schema";

type Step = "Repair" | "Replacement" | "Disposal" | "Return"; 

interface IDefective {
    ticket: Schema.Types.ObjectId;
    device: Schema.Types.ObjectId;
    description: string;
    date: Date;
    isRepairable: boolean;
    steps: Step;
}

export type { IDefective }