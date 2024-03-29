"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRecovery = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const config_1 = require("../../../cnb-1-main/config");
const gmail_1 = require("../a-3-helpers/h-3-gmail/gmail");
const validators_1 = require("../a-3-helpers/h-2-more/validators");
const generateToken_1 = require("../a-3-helpers/h-2-more/generateToken");
const passwordRecovery = async (req, res) => {
    const { email, html1, html2, message, from } = req.body;
    if (!(0, validators_1.emailValidator)(email))
        res.status(400)
            .json({ error: "Email address not valid /ᐠ-ꞈ-ᐟ\\", email, emailRegExp: validators_1.emailRegExp, in: "passwordRecovery" });
    else
        try {
            const user = await user_1.default.findOne({ email }).exec();
            if (!user)
                res.status(404)
                    .json({ error: "Email address not found /ᐠ-ꞈ-ᐟ\\", email, in: "passwordRecovery" });
            else {
                try {
                    const resetPasswordToken = await (0, generateToken_1.generateResetPasswordToken)(user._id);
                    let html = message;
                    if (message && message.includes("$token$")) {
                        do {
                            html = html.replace("$token$", resetPasswordToken);
                        } while (html.includes("$token$"));
                    }
                    else {
                        html = (html1 ||
                            '<div style="color: lime; background-color: black; padding: 10px">' +
                                'password recovery link: ' +
                                `<a href="http://localhost:3000/#/set-new-password/${resetPasswordToken}">` +
                                `http://localhost:3000/#/set-new-password/${resetPasswordToken}` +
                                '</a>' +
                                '<div>resetPasswordToken: ') + resetPasswordToken + (html2 ||
                            '</div>' +
                                '</div>');
                    }
                    const fromFinal = from || "cards-nya <neko.nyakus.cafe@gmail.com>";
                    const answer = await (0, gmail_1.sendMail)(fromFinal, email, "password recovery", html);
                    res.status(200).json({
                        info: "sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—",
                        success: Boolean(answer.accepted && answer.accepted.length > 0),
                        answer: config_1.DEV_VERSION && answer,
                        html: config_1.DEV_VERSION && html,
                    });
                }
                catch (e) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        info: "Back doesn't know what the error is... ^._.^",
                        errorObject: config_1.DEV_VERSION && e,
                        in: "passwordRecovery/sendMail",
                    });
                }
            }
        }
        catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: config_1.DEV_VERSION && e,
                in: "passwordRecovery/User.findOne",
            });
        }
};
exports.passwordRecovery = passwordRecovery;
//# sourceMappingURL=passwordRecovery.js.map