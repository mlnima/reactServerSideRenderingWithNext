"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const commonAPIRequestClearCaches = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/admin/settings/clearCaches?token=${localStorage.wt}`);
});
exports.default = commonAPIRequestClearCaches;
//# sourceMappingURL=clearCaches.js.map