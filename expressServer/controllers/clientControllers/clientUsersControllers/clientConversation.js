"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var conversationSchema_1 = tslib_1.__importDefault(require("../../../models/conversationSchema"));
var clientConversation = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var senderId, receiverId, conversationData, conversation, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                senderId = req.userData._id;
                receiverId = req.body._id;
                conversationData = {
                    users: [senderId, receiverId].sort()
                };
                return [4 /*yield*/, conversationSchema_1.default.findOneAndUpdate({ users: { "$eq": [senderId, receiverId].sort() } }, tslib_1.__assign({}, conversationData), { new: true, upsert: true }).exec()];
            case 1:
                conversation = _a.sent();
                res.json({ conversation: conversation });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = clientConversation;
//# sourceMappingURL=clientConversation.js.map