"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAPIRequestUploadImage = void 0;
const tslib_1 = require("tslib");
const AxiosInstance_1 = require("../lib/AxiosInstance");
const FileServerAxiosInstance = (0, AxiosInstance_1.getAxiosInstance)('fileServer');
const clientAPIRequestUploadImage = (formData) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return yield FileServerAxiosInstance.post(`/files/v1/upload/uploadImage`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.wt}`,
        },
    });
});
exports.clientAPIRequestUploadImage = clientAPIRequestUploadImage;
//# sourceMappingURL=clientFileManager.js.map