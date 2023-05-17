"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUpdateWidget = exports.dashboardAPIRequestGetWidgets = exports.dashboardAPIRequestDeleteWidget = exports.dashboardAPIRequestCreateNewWidget = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestCreateNewWidget = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/widgets/createWidget', { data, token: localStorage.wt });
});
exports.dashboardAPIRequestCreateNewWidget = dashboardAPIRequestCreateNewWidget;
const dashboardAPIRequestDeleteWidget = (_id) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/widgets/adminDeleteWidget', { _id, token: localStorage.wt });
});
exports.dashboardAPIRequestDeleteWidget = dashboardAPIRequestDeleteWidget;
const dashboardAPIRequestGetWidgets = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/widgets/getWidgets?token=${localStorage.wt}`);
});
exports.dashboardAPIRequestGetWidgets = dashboardAPIRequestGetWidgets;
const dashboardAPIRequestUpdateWidget = (widgetData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/widgets/updateWidget', { widgetData, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdateWidget = dashboardAPIRequestUpdateWidget;
//# sourceMappingURL=dashboardWidgets.js.map