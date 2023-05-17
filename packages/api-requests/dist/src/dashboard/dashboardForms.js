"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestGetForms = exports.dashboardAPIRequestGetForm = exports.dashboardAPIRequestDeleteForm = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestDeleteForm = (formId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.delete(`/api/admin/forms/deleteFormData?_id=${formId}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestDeleteForm = dashboardAPIRequestDeleteForm;
const dashboardAPIRequestGetForm = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/forms/getForm?_id=${_id}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetForm = dashboardAPIRequestGetForm;
const dashboardAPIRequestGetForms = (queriesData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/forms/getForms${queriesData}&token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetForms = dashboardAPIRequestGetForms;
//# sourceMappingURL=dashboardForms.js.map