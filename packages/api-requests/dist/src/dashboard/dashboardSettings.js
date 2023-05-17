"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdateSetting = exports.dashboardAPIRequestGetSettings = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestGetSettings = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const settingsQuery = settings.map((setting) => `setting=${setting}`).join('&');
    // return await AxiosInstance.get(`/api/admin/settings/getMultipleSetting?setting=identity&setting=initialSettings&setting=design&setting=adminSettings&setting=membershipSettings&token=${localStorage.wt}`)
    return yield AxiosInstance_1.default.get(`/api/admin/settings/getMultipleSetting?${settingsQuery}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetSettings = dashboardAPIRequestGetSettings;
const dashboardAPIRequestUpdateSetting = (type, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/settings/update', { type, data, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdateSetting = dashboardAPIRequestUpdateSetting;
//# sourceMappingURL=dashboardSettings.js.map