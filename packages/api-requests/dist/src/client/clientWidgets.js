"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestSaveFormData = exports.clientAPIRequestGetWidgets = exports.clientAPIRequestGetUncachedWidgetsForAdmin = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestGetUncachedWidgetsForAdmin = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/widgets/getPopulatedWidgets?token=${localStorage.wt}`);
});
exports.clientAPIRequestGetUncachedWidgetsForAdmin = clientAPIRequestGetUncachedWidgetsForAdmin;
const clientAPIRequestGetWidgets = (widgets, locale) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const widgetsQuery = `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`;
    return yield AxiosInstance_1.default.get(`/api/v1/widgets/getWidgets${widgetsQuery}`);
});
exports.clientAPIRequestGetWidgets = clientAPIRequestGetWidgets;
const clientAPIRequestSaveFormData = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/v1/forms/saveFormData`, { data });
});
exports.clientAPIRequestSaveFormData = clientAPIRequestSaveFormData;
//# sourceMappingURL=clientWidgets.js.map