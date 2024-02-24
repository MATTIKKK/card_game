"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../cnb-1-main/config");
const generateToken_1 = require("../a-3-helpers/h-2-more/generateToken");
const validators_1 = require("../a-3-helpers/h-2-more/validators");
const getMe_1 = require("./getMe");
const logIn = async (req, res) => {
    const { email, password, rememberMe } = req.body;
    if ((0, validators_1.validateAuth)(req, res, "logIn")) {
        try {
            const user = await user_1.default.findOne({ email }).exec();
            if (!user)
                res.status(400).json({ error: "user not found /ᐠ-ꞈ-ᐟ\\", email, in: "logIn" });
            else if (!(await bcrypt_1.default.compare(password, user.password)))
                res.status(400)
                    .json({ error: "not correct password /ᐠ-ꞈ-ᐟ\\", password, in: "logIn" });
            else {
                const [token, tokenDeathTime] = (0, generateToken_1.generateToken)(!!rememberMe);
                try {
                    const newUser = await user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime, rememberMe: !!rememberMe }, { new: true }).exec();
                    if (!newUser)
                        res.status(500)
                            .json({ error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: "logIn/User.findByIdAndUpdate" });
                    else {
                        // if (DEV_VERSION) console.log('IUser?: ', {...newUser}); // for dev => _doc!!!
                        await (0, getMe_1.getMe)(req, res, newUser._doc);
                    }
                }
                catch (e) {
                    res.status(500).json({
                        error: "some error: " + e.message,
                        info: "Back doesn't know what the error is... ^._.^",
                        errorObject: config_1.DEV_VERSION && { ...e },
                        in: "logIn/User.findByIdAndUpdate",
                    });
                }
            }
        }
        catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: config_1.DEV_VERSION && { ...e },
                in: "logIn/User.findOne",
            });
        }
    }
};
exports.logIn = logIn;
//# sourceMappingURL=logIn.js.map