"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
mongoose_1.default.Promise = global.Promise;
var mongoDBConnectionUrl = process.env.DB_LOCAL === 'true' ?
    "mongodb://localhost:".concat(process.env.DB_PORT, "/").concat(process.env.DB_NAME) :
    "mongodb://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASS, "@").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT, "/").concat(process.env.DB_NAME);
var options = {
    useUnifiedTopology: true
};
var connectToDatabase = function (name) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mongoose_1.default.connect(mongoDBConnectionUrl, options)
                        .then(function () {
                        console.log("".concat(name || '', ": connected to Database"));
                    })
                        .catch(function (error) {
                        console.log('error connection to Database', error);
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_1 = _a.sent();
                console.log('error connection to Database', err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/, null];
        }
    });
}); };
exports.default = connectToDatabase;
//# sourceMappingURL=connectToDatabase.js.map