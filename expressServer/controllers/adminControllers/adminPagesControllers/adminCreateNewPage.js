"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var pageSchema_1 = tslib_1.__importDefault(require("../../../models/pageSchema"));
var adminCreateNewPage = function (req, res) {
    var newPageDataToSave = new pageSchema_1.default(req.body.pageData);
    newPageDataToSave === null || newPageDataToSave === void 0 ? void 0 : newPageDataToSave.save().then(function (savedPage) {
        res.json({ savedPageData: savedPage, error: false });
    }).catch(function (err) {
        console.log(err);
        res.end();
    });
};
exports.default = adminCreateNewPage;
//# sourceMappingURL=adminCreateNewPage.js.map