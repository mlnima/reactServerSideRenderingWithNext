"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var conversationSchema_1 = tslib_1.__importDefault(require("../../../models/conversationSchema"));
var clientMessageToConversation = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var messageData, addConversationIdToSenderData, createOrUpdateConversation, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                messageData = {
                    messageBody: req.body.messageBody,
                    author: req.userData._id,
                    createdAt: Date.now()
                };
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(req.userData._id, { $addToSet: { conversation: [req.body.conversationId] } }).exec()];
            case 1:
                addConversationIdToSenderData = _a.sent();
                return [4 /*yield*/, conversationSchema_1.default.findByIdAndUpdate(req.body.conversationId, { $push: { messages: [messageData] } }, { new: true }).exec()];
            case 2:
                createOrUpdateConversation = _a.sent();
                Promise.all([addConversationIdToSenderData, createOrUpdateConversation]).then(function (responseData) {
                    res.json({ updatedConversation: responseData[1] });
                }).catch(function (err) {
                    console.log(err);
                    res.status(500);
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = clientMessageToConversation;
//# sourceMappingURL=clientMessageToConversation.js.map