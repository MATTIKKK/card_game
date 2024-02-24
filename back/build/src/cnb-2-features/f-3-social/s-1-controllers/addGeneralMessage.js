"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGeneralMessage = void 0;
const generalChatMessage_1 = __importDefault(require("../s-2-models/generalChatMessage"));
const errorStatuses_1 = require("../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const addGeneralMessage = async (req, res, user) => {
    const { message } = req.body;
    if (!message)
        (0, errorStatuses_1.status400)(res, `No message in body!`, user, 'addGeneralMessage');
    else {
        generalChatMessage_1.default.create({
            user_id: user._id,
            user_name: user.name,
            isAdmin: user.isAdmin,
            avatar: user.avatar || '',
            message,
        })
            .then((newGeneralChatMessage) => res.status(201).json({
            newGeneralChatMessage,
            success: true,
            token: user.token,
            tokenDeathTime: user.tokenDeathTime
        }))
            .catch(e => (0, errorStatuses_1.status500)(res, e, user, 'addGeneralMessage/GeneralChatMessage.create'));
    }
};
exports.addGeneralMessage = addGeneralMessage;
//# sourceMappingURL=addGeneralMessage.js.map