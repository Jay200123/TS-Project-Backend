import userService from "../user/service";
import { ErrorHandler, SuccessHandler } from "../../utils";
import { Request, Response, NextFunction, mongoose } from "../../interface";
import bcrypt from "bcrypt";
import { generateToken, generateBlacklist } from "../../middleware";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.getByEmail(req.body.email);

    if (!data) {
        return next(new ErrorHandler("Email not Found"));
    }

    const match = await bcrypt.compare(req.body.password, data.password);
    if (!match) {
        return next(new ErrorHandler("Wrong Password"));
    }

    const token = generateToken({ _id: data._id as mongoose.Types.ObjectId });

    return SuccessHandler(res, "Login Success", data, token);
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'].split(' ')[1];

    if (token) {
        await generateBlacklist(token);
    }

    return SuccessHandler(res, "Logout Success", []);
}

export {
    login,
    logout
}
