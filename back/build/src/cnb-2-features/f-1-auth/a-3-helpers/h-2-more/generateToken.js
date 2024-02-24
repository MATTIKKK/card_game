"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateResetPasswordToken = void 0;
const user_1 = __importDefault(require("../../a-2-models/user"));
const v1_1 = __importDefault(require("uuid/v1"));
const generateResetPasswordToken = async (userId) => {
    // const chars = "ADEFGHJLMNPQRTYabdefghijmnpqrty2345679!@#$%^&*()-+=?.,"; // Il1Oo0CcSsUuVvWwXxZzB8Kk
    //
    // let password = "";
    // for (let i = 0; i < 9; i++) {
    //     password += chars[Math.floor(Math.random() * chars.length)];
    // }
    const resetPasswordToken = (0, v1_1.default)();
    await user_1.default.findByIdAndUpdate(userId, { resetPasswordToken, resetPasswordTokenDeathTime: Date.now() + (1000 * 60 * 10) }, // 10 min
    { new: true }).exec();
    return resetPasswordToken;
};
exports.generateResetPasswordToken = generateResetPasswordToken;
const generateToken = (rememberMe) => {
    const token = (0, v1_1.default)();
    const tokenDeathTime = rememberMe
        ? Date.now() + (1000 * 60 * 60 * 24 * 7) // 7 days
        : Date.now() + (1000 * 60 * 60 * 3); // 3 hours
    return [token, tokenDeathTime];
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map