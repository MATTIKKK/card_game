"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const errorStatuses_1 = require("../a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../cnb-1-main/cookie");
const updateUser = async (req, res, user) => {
    const { name, avatar } = req.body;
    if (!name && !avatar)
        (0, errorStatuses_1.status400)(res, "no name and avatar in body /ᐠ-ꞈ-ᐟ\\", user, "updateUser");
    else
        try {
            const updatedUser = await user_1.default.findByIdAndUpdate(user._id, {
                name: name || user.name,
                avatar: avatar || user.avatar
            }, { new: true }).exec();
            if (!updatedUser)
                (0, errorStatuses_1.status500)(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "updateUser");
            else {
                const body = { ...updatedUser._doc };
                delete body.password; // don't send password to the front
                delete body.resetPasswordToken;
                delete body.resetPasswordTokenDeathTime;
                (0, cookie_1.resCookie)(res, user).status(200).json({
                    updatedUser: body,
                    token: user.token,
                    tokenDeathTime: user.tokenDeathTime
                });
            }
        }
        catch (e) {
            (0, errorStatuses_1.status500)(res, e, user, "updateUser/User.findByIdAndUpdate");
        }
};
exports.updateUser = updateUser;
//# sourceMappingURL=updateUser.js.map