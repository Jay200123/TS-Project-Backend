import jwt, { SignOptions } from "jsonwebtoken";
import { mongoose } from "../schema";
import { IUser } from "../models/user";
import { Request } from "../routes";

interface TokenPayload {
    _id: mongoose.Types.ObjectId;
}

interface DecodeToken {
    _id: string,
    exp: number
}

interface AuthenticatedRequest extends Request {
    user?: IUser
}

export {
    jwt,
    SignOptions,
    TokenPayload,
    DecodeToken,
    AuthenticatedRequest
}