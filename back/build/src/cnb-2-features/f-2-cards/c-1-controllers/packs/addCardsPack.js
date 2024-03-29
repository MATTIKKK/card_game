"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCardsPack = void 0;
const user_1 = __importDefault(require("../../../f-1-auth/a-2-models/user"));
const cardsPack_1 = __importDefault(require("../../c-2-models/cardsPack"));
const errorStatuses_1 = require("../../../f-1-auth/a-3-helpers/h-2-more/errorStatuses");
const cookie_1 = require("../../../../cnb-1-main/cookie");
const addCardsPack = async (req, res, user) => {
    const { cardsPack } = req.body;
    if (!cardsPack)
        (0, errorStatuses_1.status400)(res, "No cardsPack in body! /ᐠ-ꞈ-ᐟ\\", user, "addCardsPack", { body: req.body });
    else {
        const nameF = cardsPack.name || "no Name";
        const pathF = cardsPack.path || "/def";
        const typeF = cardsPack.type || "pack";
        const gradeF = isFinite(cardsPack.grade) ? +cardsPack.grade : 0;
        const shotsF = isFinite(cardsPack.shots) ? +cardsPack.shots : 0;
        // add private
        if (gradeF > 5 || gradeF < 0)
            (0, errorStatuses_1.status400)(res, `CardsPack grade [${gradeF}] not valid! must be between 0 and 5... /ᐠ-ꞈ-ᐟ\\`, user, "addCardsPack", { body: req.body });
        else
            cardsPack_1.default.create({
                user_id: user._id,
                user_name: user.name,
                private: !!cardsPack.private,
                name: nameF,
                path: pathF,
                grade: gradeF,
                shots: shotsF,
                deckCover: cardsPack.deckCover,
                cardsCount: 0,
                type: typeF,
                rating: 0,
                created: new Date(),
                updated: new Date(),
                more_id: user._id,
                _doc: {}, // crutch
            })
                .then((newCardsPack) => {
                cardsPack_1.default.count({ user_id: user._id, private: false })
                    .exec()
                    .then(cardPacksTotalCount => {
                    user_1.default.findByIdAndUpdate(user._id, { publicCardPacksCount: cardPacksTotalCount }, { new: true })
                        .exec()
                        .then((updatedUser) => {
                        if (!updatedUser)
                            (0, errorStatuses_1.status400)(res, "not updated? /ᐠ｡ꞈ｡ᐟ\\", user, "addCardsPack");
                        else
                            (0, cookie_1.resCookie)(res, user).status(201).json({
                                newCardsPack,
                                token: user.token,
                                tokenDeathTime: user.tokenDeathTime,
                            });
                    })
                        .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCardsPack/User.findByIdAndUpdate"));
                })
                    .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCardsPack/CardsPack.count"));
            })
                .catch(e => (0, errorStatuses_1.status500)(res, e, user, "addCardsPack/CardsPack.create"));
    }
};
exports.addCardsPack = addCardsPack;
//# sourceMappingURL=addCardsPack.js.map