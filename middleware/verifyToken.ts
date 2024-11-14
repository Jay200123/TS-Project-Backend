
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

export {
    verifyToken,
}
