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
    isAuthorized: boolean,
    image: Image[]
}

export type { IUser }