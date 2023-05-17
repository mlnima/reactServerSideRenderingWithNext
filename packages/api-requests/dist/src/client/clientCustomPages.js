"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestGetPage = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const clientAPIRequestGetPage = (pageName) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.get(`/api/v1/pages/getPage?pageName=${pageName}`);
});
exports.clientAPIRequestGetPage = clientAPIRequestGetPage;
//# sourceMappingURL=clientCustomPages.js.map