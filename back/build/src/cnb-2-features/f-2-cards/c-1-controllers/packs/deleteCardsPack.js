"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCardsPack = void 0;
const user_1 = __importDefault(require("../../../f-1-auth/a-2-models/user"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
const deleteCardsPack = async (req, res, user) => {
    const { id } = req.query;
    if (!id)
        (0, errorStatuses_1.status400)(res, "No CardsPack id /ᐠ-ꞈ-ᐟ\\", user, "deleteCardsPack", { query: req.query });
    else
        cardsPack_1.default.findById(id)
            .exec()
            .then((cardsPackF) => {
            if (!cardsPackF)
                (0, errorStatuses_1.status400)(res, "CardsPack id not valid /ᐠ-ꞈ-ᐟ\\", user, "deleteCardsPack/CardsPack.findById", { query: req.query });
            else if (!cardsPackF.user_id.equals(user._id))
                (0, errorStatuses_1.status400)(res, "not your CardsPack! /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack", { query: req.query });
            else
                cardsPack_1.default.findByIdAndDelete(id)
                    .exec()
                    .then((cardsPack) => {
                    if (!cardsPack)
                        (0, errorStatuses_1.status400)(res, "CardsPack id not valid /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack/CardsPack.findByIdAndDelete", { query: req.query });
                    else {
                        cardsPack_1.default.count({ user_id: user._id, private: false })
                            .exec()
                            .then(cardPacksTotalCount => {
                            user_1.default.findByIdAndUpdate(user._id, { publicCardPacksCount: cardPacksTotalCount }, { new: true })
                                .exec()
                                .then((updatedUser) => {
                                if (!updatedUser)
                                    (0, errorStatuses_1.status400)(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "deleteCardsPack");
                                else
                                    (0, cookie_1.resCookie)(res, user).status(200).json({
                                        deletedCardsPack: cardsPack,
                                        token: user.token,
                                        tokenDeathTime: user.tokenDeathTime,
                                    });
                            })
                                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "deleteCardsPack/User.findByIdAndUpdate"));
                        })
                            .catch(e => (0, errorStatuses_1.status500)(res, e, user, "deleteCardsPack/CardsPack.count"));
                    }
                })
                    .catch(e => (0, errorStatuses_1.status500)(res, e, user, "deleteCardsPack/CardsPack.findByIdAndDelete"));
        })
            .catch(e => (0, errorStatuses_1.status500)(res, e, user, "deleteCardsPack/CardsPack.findById"));
};
exports.deleteCardsPack = deleteCardsPack;
//# sourceMappingURL=deleteCardsPack.js.map