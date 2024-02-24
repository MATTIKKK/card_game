"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = void 0;
const cookie_1 = require("../../../cnb-1-main/cookie");
const logOut = async (req, res, user) => {
    res.cookie("token", "", {
        ...cookie_1.cookieSettings,
        expires: new Date(0),
    }).status(200).json({ info: "logOut success —ฅ/ᐠ.̫ .ᐟ\\ฅ—" });
};
exports.logOut = logOut;
//# sourceMappingURL=logOut.js.map