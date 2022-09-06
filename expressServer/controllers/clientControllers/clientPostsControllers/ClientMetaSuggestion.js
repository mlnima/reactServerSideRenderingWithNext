"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metaSchema_1 = tslib_1.__importDefault(require("../../../models/metaSchema"));
var ClientMetaSuggestion = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var type, statusQuery, size, startWithQuery, err_1;
    var _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                type = { type: req.query.metaType };
                statusQuery = { status: 'published' };
                size = 10;
                startWithQuery = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.startWith) === 'any' ? {} :
                    { name: { $regex: '^' + ((_b = req.query) === null || _b === void 0 ? void 0 : _b.startWith), $options: 'i' } };
                return [4 /*yield*/, metaSchema_1.default.find({ $and: [type, startWithQuery, statusQuery] }, 'name type', { sort: { 'updatedAt': -1 } })
                        .limit(size)
                        .exec()
                        .then(function (metas) {
                        res.json({ metas: metas });
                    }).catch(function (err) {
                        res.json({ metas: [] });
                    })];
            case 1:
                _c.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _c.sent();
                console.log(err_1);
                res.end();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = ClientMetaSuggestion;
//# sourceMappingURL=ClientMetaSuggestion.js.map