"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardAPIRequestUploadFile = exports.dashboardAPIRequestUpdateTranslationFile = exports.dashboardAPIRequestReadTranslationFile = exports.dashboardAPIRequestReadPath = exports.dashboardAPIRequestDeleteFile = exports.dashboardAPIRequestCreateFolder = exports.dashboardAPIRequestCreateFileOrFolder = exports.dashboardAPIRequestCreateFile = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = tslib_1.__importDefault(require("../lib/AxiosInstance"));
const dashboardAPIRequestCreateFile = (fileName, filePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/expressServer/files/admin-newFile', { fileName, filePath, token: localStorage.wt });
});
exports.dashboardAPIRequestCreateFile = dashboardAPIRequestCreateFile;
const dashboardAPIRequestCreateFileOrFolder = (data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/expressServer/files/admin-newFolder', { data, token: localStorage.wt });
});
exports.dashboardAPIRequestCreateFileOrFolder = dashboardAPIRequestCreateFileOrFolder;
const dashboardAPIRequestCreateFolder = (folderName, folderPath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/expressServer/files/admin-newFolder', { folderName, folderPath, token: localStorage.wt });
});
exports.dashboardAPIRequestCreateFolder = dashboardAPIRequestCreateFolder;
const dashboardAPIRequestDeleteFile = (filePath) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/fileManager/deleteFile', { filePath, token: localStorage.wt });
});
exports.dashboardAPIRequestDeleteFile = dashboardAPIRequestDeleteFile;
const dashboardAPIRequestReadPath = (path) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/fileManager/readPath', { path, token: localStorage.wt });
});
exports.dashboardAPIRequestReadPath = dashboardAPIRequestReadPath;
const dashboardAPIRequestReadTranslationFile = (path) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/fileManager/readTranslationsFile', { path, token: localStorage.wt });
});
exports.dashboardAPIRequestReadTranslationFile = dashboardAPIRequestReadTranslationFile;
const dashboardAPIRequestUpdateTranslationFile = (path, data) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/fileManager/updateTranslationsFile', { path, data, token: localStorage.wt });
});
exports.dashboardAPIRequestUpdateTranslationFile = dashboardAPIRequestUpdateTranslationFile;
const dashboardAPIRequestUploadFile = (file) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield AxiosInstance_1.default.post('/api/admin/fileManager/uploadFile', file);
});
exports.dashboardAPIRequestUploadFile = dashboardAPIRequestUploadFile;
//** did not find any usage
// const deleteFiles = async (ids) => {
//     const params = new URLSearchParams({ids: ids.join(',')});
//     return await AxiosInstance.delete('/files/admin/fileManager/deleteFile', {
//             params,
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${localStorage.wt}`,
//             },
//         }
//     )
// }
//# sourceMappingURL=dashboardFileManager.js.map