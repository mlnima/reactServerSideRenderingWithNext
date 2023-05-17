"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestBackupMetas = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestBackupMetas = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post(`/api/admin/backups/metas`, Object.assign({ token: localStorage.wt }, data), {
        responseType: 'blob'
    });
});
exports.dashboardAPIRequestBackupMetas = dashboardAPIRequestBackupMetas;
//# sourceMappingURL=dashboardBackup.js.map