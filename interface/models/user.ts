import mongoose from "mongoose"
import { Image } from "../image"
import { Document } from "../schema"

type Roles = "customer" | "admin"

interface IUser extends Document {
    fname: string,
    lname: string,
    phone: string,
    address: string,
    city: string,
    email: string,
    password: string,
    role: Roles,
    position: string,
    department: mongoose.Schema.Types.ObjectId,
    branch: mongoose.Schema.Types.ObjectId,
    isAuthorized: boolean,
    image: Image[]
}

export type { IUser }