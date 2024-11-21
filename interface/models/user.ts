import mongoose from "mongoose"
import { Image } from "../image"
import { Document } from "../schema"

type Roles = "customer" | "admin" | "employee";

interface IUser extends Document {
    fname: string,
    lname: string,
    phone: string,
    address: string,
    city: string,
    email: string,
    password: string,
    role: Roles,
    branch: mongoose.Schema.Types.ObjectId,
    department: mongoose.Schema.Types.ObjectId,
    position: mongoose.Schema.Types.ObjectId,
    isAuthorized: boolean,
    image: Image[]
}

export type { IUser }