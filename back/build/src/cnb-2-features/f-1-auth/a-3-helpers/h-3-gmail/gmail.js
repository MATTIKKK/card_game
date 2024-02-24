"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../../cnb-1-main/config");
// // @ts-ignore
// const transporter = nodeMailer.createTransport({ service: "Outlook365",
//     host: "smtp.office365.com",
//     port: "587",
//     tls: {
//         ciphers: "SSLv3",
//         rejectUnauthorized: false,
//     },
//     auth: {
//         user: 'neko.cafe@outlook.com',
//         pass: process.env.GMAIL_PASS || GMAIL_PASS
//     }
// });
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        // type: "login",
        user: process.env.GMAIL_USER || config_1.GMAIL_USER,
        pass: process.env.GMAIL_PASS || config_1.GMAIL_PASS
    }
});
const sendMail = async (from, to, subject, html, text) => {
    // for accept
    // https://myaccount.google.com/lesssecureapps
    const info = await transporter.sendMail({
        from: 'neko.cafe@outlook.com',
        to,
        subject,
        text,
        html: text ? undefined : html,
    });
    if (config_1.DEV_VERSION)
        console.log("gmail info: ", info);
    return info;
};
exports.sendMail = sendMail;
//# sourceMappingURL=gmail.js.map