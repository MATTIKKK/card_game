"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const cookie_1 = require("../../../cnb-1-main/cookie");
const getMe = async (req, res, user) => {
    const body = { ...user };
    delete body.password;
    delete body.resetPasswordToken;
    delete body.resetPasswordTokenDeathTime;
    (0, cookie_1.resCookie)(res, user).status(200).json({ ...body });
};
exports.getMe = getMe;
//# sourceMappingURL=getMe.js.map