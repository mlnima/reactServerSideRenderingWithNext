"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var postSchema_1 = tslib_1.__importDefault(require("../../../models/postSchema"));
var clientLikeDislikeView = function (req, res) {
    var _a;
    postSchema_1.default.findByIdAndUpdate(req.body.id, { $inc: (_a = {}, _a[req.body.type] = 1, _a) }, { new: true, timestamps: false
    })
        .select(' likes , disLikes , views ')
        .exec().then(function (updatedData) {
        res.json({ updatedData: updatedData });
    }).catch(function (err) {
        console.log(err);
        res.end();
    });
};
exports.default = clientLikeDislikeView;
//# sourceMappingURL=clientLikeDislikeView.js.map