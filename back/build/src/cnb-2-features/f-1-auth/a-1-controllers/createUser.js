"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../a-3-helpers/h-2-more/validators");
const config_1 = require("../../../cnb-1-main/config");
const createUser = async (req, res) => {
    const { email, password } = req.body;
    if ((0, validators_1.validateAuth)(req, res, "createUser")) {
        try {
            const oldUser = await user_1.default.findOne({ email }).exec();
            if (oldUser)
                res.status(400).json({ error: "email already exists /ᐠ｡ꞈ｡ᐟ\\", email, in: "createUser" });
            else {
                const user = await user_1.default.create({
                    email,
                    password: await bcrypt_1.default.hash(password, 10),
                    rememberMe: false,
                    isAdmin: false,
                    name: email,
                    verified: false,
                    // avatar: "",
                    publicCardPacksCount: 0,
                    // token: "",
                    // tokenDeathTime: 0,
                    // resetPasswordToken: "",
                    // resetPasswordTokenDeathTime: 0,
                    created: new Date(),
                    updated: new Date(),
                    _doc: {}, // crutch
                });
                const addedUser = { ...user._doc };
                delete addedUser.password; // don't send password to the front
                delete addedUser.resetPasswordToken;
                delete addedUser.resetPasswordTokenDeathTime;
                res.status(201).json({ addedUser });
            }
        }
        catch (e) {
            res.status(500).json({
                error: "some error: " + e.message,
                info: "Back doesn't know what the error is... ^._.^",
                errorObject: config_1.DEV_VERSION && { ...e },
                in: "createUser/User.create",
            });
        }
    }
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map