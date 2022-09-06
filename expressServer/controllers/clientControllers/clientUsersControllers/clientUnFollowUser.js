"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var clientUnFollowUser = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var senderUnFollowReqUser, receiverUnFollowReqUserId, updateReceiver, updateSender, updateReceiverUnFollowReqData, updateSenderUnFollowReqData, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                senderUnFollowReqUser = req.userData;
                receiverUnFollowReqUserId = req.body._id;
                updateReceiver = {
                    $pull: { followers: senderUnFollowReqUser._id },
                    $inc: { followersCount: -1 }
                };
                updateSender = {
                    $pull: { following: receiverUnFollowReqUserId },
                    $inc: { followingCount: -1 }
                };
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(receiverUnFollowReqUserId, updateReceiver).exec()];
            case 1:
                updateReceiverUnFollowReqData = _a.sent();
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(senderUnFollowReqUser._id, updateSender, { new: true }).exec()];
            case 2:
                updateSenderUnFollowReqData = _a.sent();
                Promise.all([updateReceiverUnFollowReqData, updateSenderUnFollowReqData]).then(function (actionsResults) {
                    var _a;
                    var updatedRequestSenderData = {
                        following: ((_a = actionsResults[1]) === null || _a === void 0 ? void 0 : _a.following) || []
                    };
                    res.json({ updatedRequestSenderData: updatedRequestSenderData });
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
exports.default = clientUnFollowUser;
//# sourceMappingURL=clientUnFollowUser.js.map