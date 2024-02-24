"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByToken = void 0;
const user_1 = __importDefault(require("../../a-2-models/user"));
const generateToken_1 = require("./generateToken");
const config_1 = require("../../../../cnb-1-main/config");
const findUserByToken = (f, inTry) => async (req, res) => {
    const token = req.cookies.token || req.body.token || req.query.token;
    console.log(`findUserByToken`, res);
    try {
        const user = await user_1.default.findOne({ token }).exec();
        console.log("user from back", user);
        if (!user || !user.tokenDeathTime || user.tokenDeathTime < new Date().getTime())
            res.status(401)
                .json({ error: "you are not authorized /ᐠ-ꞈ-ᐟ\\", in: inTry + "/findUserByToken/User.findOne" });
        else {
            const [token, tokenDeathTime] = (0, generateToken_1.generateToken)(user.rememberMe);
            try {
                const newUser = await user_1.default.findByIdAndUpdate(user._id, { token, tokenDeathTime }, { new: true }).exec();
                if (!newUser)
                    res.status(500)
                        .json({ error: "not updated? /ᐠ｡ꞈ｡ᐟ\\", in: inTry + "/User.findByIdAndUpdate", });
                else {
                    f(req, res, newUser._doc);
                }
            }
            catch (e) {
                res.status(500).json({
                    error: "some error: " + e.message,
                    info: "Back doesn't know what the error is... ^._.^",
                    errorObject: config_1.DEV_VERSION && { ...e },
                    in: inTry + "/User.findByIdAndUpdate",
                });
            }
        }
    }
    catch (e) {
        res.status(500).json({
            error: "some error: " + e.message,
            info: "Back doesn't know what the error is... ^._.^",
            errorObject: config_1.DEV_VERSION && { ...e },
            in: inTry + "/findUserByToken/User.findOne",
        });
    }
};
exports.findUserByToken = findUserByToken;
//# sourceMappingURL=findUserByToken.js.map