"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.block = void 0;
const user_1 = __importDefault(require("../a-2-models/user"));
const cookie_1 = require("../../../cnb-1-main/cookie");
const cardsPack_1 = __importDefault(require("../../f-2-cards/c-2-models/cardsPack"));
const block = async (req, res, user) => {
    const { id, blockReason } = req.body;
    if (user.isBlocked) {
        (0, cookie_1.resCookie)(res, user).status(400).json({ error: 'you blocked' });
        return;
    }
    const u = await user_1.default.findById(id);
    if (!u) {
        (0, cookie_1.resCookie)(res, user).status(400).json({ error: 'no user by id: ' + id, body: req.body });
        return;
    }
    if (u.isBlocked) {
        (0, cookie_1.resCookie)(res, user).status(200).json({ warning: 'user was blocked' });
        return;
    }
    u.blockReason = blockReason;
    u.blockTime = Date.now();
    u.blockUserId = user._id + '';
    u.isBlocked = true;
    const ps = await cardsPack_1.default.find({ user_id: u._id.toString() });
    for (let p of ps) {
        await cardsPack_1.default.findByIdAndUpdate(p._id, { isBlocked: true });
    }
    (0, cookie_1.resCookie)(res, user).status(200).json({ user: 'blocked', blockedCardPacksCount: ps.length });
};
exports.block = block;
//# sourceMappingURL=block.js.map