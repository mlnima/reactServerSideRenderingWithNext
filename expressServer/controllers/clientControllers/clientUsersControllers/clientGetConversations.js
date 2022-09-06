"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var conversationSchema_1 = tslib_1.__importDefault(require("../../../models/conversationSchema"));
var clientGetConversations = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var conversations, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, conversationSchema_1.default.find({ users: { "$in": [req.userData._id] } }, { messages: { $slice: -1 } })
                        .limit(20)
                        .select('users updatedAt')
                        .sort({ updatedAt: -1 })
                        .populate([
                        { path: 'users', select: ['username', 'profileImage'] },
                    ])
                        .exec()];
            case 1:
                conversations = _a.sent();
                res.json({ conversations: conversations });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetConversations;
//# sourceMappingURL=clientGetConversations.js.map