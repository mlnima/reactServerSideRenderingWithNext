"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientSendMessage = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var senderTheMessageData, receiverOfTheMessageId, theMessageDataForReceiver, theMessageDataForSender, updateReceiverOfTheMessageData, updateSenderOfTheMessageData, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                senderTheMessageData = req.userData;
                receiverOfTheMessageId = req.body._id;
                theMessageDataForReceiver = {
                    message: req.body.message,
                    sender: senderTheMessageData._id,
                    date: Date.now(),
                    read: false
                };
                theMessageDataForSender = {
                    message: req.body.message,
                    receiver: receiverOfTheMessageId,
                    date: Date.now(),
                };
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(receiverOfTheMessageId, { $push: { inbox: [theMessageDataForReceiver] } }).exec()];
            case 1:
                updateReceiverOfTheMessageData = _a.sent();
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(senderTheMessageData._id, { $push: { outBox: [theMessageDataForSender] } }).exec()];
            case 2:
                updateSenderOfTheMessageData = _a.sent();
                Promise.all([updateReceiverOfTheMessageData, updateSenderOfTheMessageData]).then(function (actionsResults) {
                    res.json({ serverResponse: 'message has been sent' });
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
exports.default = clientSendMessage;
//# sourceMappingURL=clientSendMessage.js.map