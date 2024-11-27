import { createTransport } from 'nodemailer';
import { RESOURCE } from "../constants";
import { globalEnvironment } from "../config";

globalEnvironment();

export const transporter = createTransport({   
    service: RESOURCE.GMAIL,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});