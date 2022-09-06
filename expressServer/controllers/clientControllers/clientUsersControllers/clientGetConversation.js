"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var conversationSchema_1 = tslib_1.__importDefault(require("../../../models/conversationSchema"));
var clientGetConversation = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var conversation, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, conversationSchema_1.default.findById(req.body._id, { messages: { $slice: req.body.loadAmount || -20 } })
                        .select('users')
                        .populate([
                        { path: 'users', select: ['username', 'profileImage'] },
                    ])
                        .exec()];
            case 1:
                conversation = _a.sent();
                res.json({ conversation: conversation });
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
exports.default = clientGetConversation;
//# sourceMappingURL=clientGetConversation.js.map