"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestGetSettings = exports.clientAPIRequestGetUncachedSettings = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestGetUncachedSettings = (requireSettings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const settingsQuery = `?${requireSettings.map(s => 'setting=' + s).join('&')}`;
    return yield AxiosInstance_1.default.get(`/api/admin/settings/getMultipleSetting${settingsQuery}&token=${localStorage.wt}`);
});
exports.clientAPIRequestGetUncachedSettings = clientAPIRequestGetUncachedSettings;
const clientAPIRequestGetSettings = (requireSettings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const settingsQuery = requireSettings.map((setting) => `setting=${setting}`).join('&');
    return yield AxiosInstance_1.default.get(`/api/v1/settings/getSettings?${settingsQuery}`);
});
exports.clientAPIRequestGetSettings = clientAPIRequestGetSettings;
//# sourceMappingURL=clientSettings.js.map