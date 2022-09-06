"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var userSchema_1 = tslib_1.__importDefault(require("../../../models/userSchema"));
var conversationSchema_1 = tslib_1.__importDefault(require("../../../models/conversationSchema"));
var clientDeleteConversation = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var conversationId, userData_1, conversationData, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                conversationId = req.query._id;
                return [4 /*yield*/, userSchema_1.default.findById(req.userData._id).exec()];
            case 1:
                userData_1 = _a.sent();
                return [4 /*yield*/, conversationSchema_1.default.findById(conversationId).exec()];
            case 2:
                conversationData = _a.sent();
                if (!userData_1 || !conversationData)
                    res.status(404).json({ message: 'Can Not Find User Or Conversation Data' });
                if (!(conversationData === null || conversationData === void 0 ? void 0 : conversationData.users.includes(userData_1._id))) return [3 /*break*/, 6];
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(req.userData._id, { $pull: { conversations: [conversationId] } }).exec()];
            case 3:
                _a.sent();
                return [4 /*yield*/, userSchema_1.default.findByIdAndUpdate(conversationData === null || conversationData === void 0 ? void 0 : conversationData.users.find(function (user) { return user._id !== userData_1._id; }), { $pull: { conversations: [conversationId] } }).exec()];
            case 4:
                _a.sent();
                return [4 /*yield*/, conversationSchema_1.default.findByIdAndDelete(conversationId).exec().then(function () {
                        res.json({ message: 'Deleted' });
                    }).catch(function (err) {
                        res.status(500).json({ message: 'Something Went Wrong', err: err });
                    })];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ message: 'Something Went Wrong' });
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(500).json({ message: 'Something Went Wrong' });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.default = clientDeleteConversation;
//# sourceMappingURL=clientDeleteConversation.js.map