
import {
    Response,
    NextFunction,
    DecodeToken,
    AuthenticatedRequest
} from ".././interface";
import userService from "../routes/user/service";
import { ErrorHandler } from "../utils";
import { jwt } from "../interface";
import { findBlacklist } from "./blacklist";
import { STATUSCODE } from "../constants";

const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer ')) {
            return next(new ErrorHandler("Authorization header missing"));
        }

        if (findBlacklist(req.headers['authorization'].split(' ')[1])) {
            return next(new ErrorHandler("User must login first"));
        }

        const decode = jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_SECRET) as DecodeToken;
        req.user = await userService.getById(decode._id);
        next();
    } catch (err) {
        return next(new ErrorHandler("User must login first"));
    }
}

const userRole = (...roles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!roles?.includes(req?.user?.role)) {
            return next(
                new ErrorHandler(
                    `You are not authorized to access this resource`,
                    STATUSCODE.FORBIDDEN
                )
            );
        }
        next();
    }
}

export {
    verifyToken,
    userRole
}
