"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var widgetSchema_1 = tslib_1.__importDefault(require("../../../../../packages/models/src/widgetSchema"));
var databaseSelectFieldsForPostCards_1 = tslib_1.__importDefault(require("../../../../../packages/data-structures/src/databaseSelectFieldsForPostCards"));
var clientGetMultipleWidgetWithData = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var locale_1, locales, excludeOtherLanguagesQuery, requestedWidgets, widgetsDataQuery, widgets, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                locale_1 = req.query.locale;
                locales = process.env.NEXT_PUBLIC_LOCALS.split(' ');
                excludeOtherLanguagesQuery = locale_1 ? { select: locales.map(function (languageCode) { return languageCode !== locale_1 ? "-data.translations.".concat(languageCode) : ''; }).join(' ') } : {};
                requestedWidgets = Array.isArray(req.query.widget) ? req.query.widget : [req.query.widget];
                widgetsDataQuery = requestedWidgets.map(function (position) { return position === 'all' ? {} : { 'data.position': position }; });
                return [4 /*yield*/, widgetSchema_1.default.find({ $or: tslib_1.__spreadArray([], tslib_1.__read(widgetsDataQuery), false) }, {}, excludeOtherLanguagesQuery).populate([
                        {
                            model: 'meta',
                            path: 'data.uniqueData.metaData',
                        },
                        {
                            model: 'post',
                            path: 'data.uniqueData.posts',
                            // populate: [
                            //     {
                            //         path: 'actors',
                            //         select: {
                            //             'name': 1,
                            //             'type': 1
                            //         },
                            //         options: {limit: 3}
                            //     },
                            //     {
                            //         path: 'categories',
                            //         select: {
                            //             'name': 1,
                            //             'type': 1,
                            //             'imageUrl': 1
                            //         },
                            //         // options: {limit: 3}
                            //     },
                            //     {
                            //         path: 'tags',
                            //         select: {
                            //             'name': 1,
                            //             'type': 1
                            //         }
                            //     }],
                            //select: {'_id': 1, 'redirectLink': 1, 'title': 1, 'mainThumbnail': 1, 'quality': 1, 'duration': 1, 'views': 1, 'translations': 1, 'VideoTrailerUrl': 1, 'postType': 1, 'likes': 1, 'disLikes': 1, 'updatedAt': 1, 'createdAt': 1,'outPostType':1}
                            select: databaseSelectFieldsForPostCards_1.default
                        },
                    ])
                        // .sort({updatedAt: -1})
                        // .select(`+translation.${locale}`)
                        // .select('-data.title')
                        .exec()];
            case 1:
                widgets = _a.sent();
                Promise.all(widgets).then(function (widgetsWithData) {
                    res.json({ widgets: widgetsWithData || [] });
                }).catch(function (err) {
                    console.log(err);
                    res.json({ widgets: [] });
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                res.status(400).send('Bad Request');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = clientGetMultipleWidgetWithData;
//# sourceMappingURL=clientGetMultipleWidgetWithData.js.map