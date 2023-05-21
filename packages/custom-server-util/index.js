"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.jwtTokenGenerator = exports.fetchUserData = exports.getCurrentDatePath = exports.authMiddleware = exports.adminAuthMiddleware = exports.renameFile = exports.createExpressServer = exports.shouldCompress = exports.connectToDatabase = exports.mongoIdValidator = void 0;
var mongoIdValidator_1 = require("./src/mongoIdValidator");
__createBinding(exports, mongoIdValidator_1, "default", "mongoIdValidator");
var connectToDatabase_1 = require("./src/connectToDatabase");
__createBinding(exports, connectToDatabase_1, "default", "connectToDatabase");
var shouldCompress_1 = require("./src/shouldCompress");
__createBinding(exports, shouldCompress_1, "default", "shouldCompress");
var createExpressServer_1 = require("./src/createExpressServer");
__createBinding(exports, createExpressServer_1, "server", "createExpressServer");
// export { app as createExpressApp } from './src/createExpressServer';
var renameFile_1 = require("./src/file-utils/renameFile");
__createBinding(exports, renameFile_1, "default", "renameFile");
var adminAuthMiddleware_1 = require("./src/middleware-utils/adminAuthMiddleware");
__createBinding(exports, adminAuthMiddleware_1, "default", "adminAuthMiddleware");
var authMiddleware_1 = require("./src/middleware-utils/authMiddleware");
__createBinding(exports, authMiddleware_1, "default", "authMiddleware");
var getCurrentDatePath_1 = require("./src/path-utils/getCurrentDatePath");
__createBinding(exports, getCurrentDatePath_1, "default", "getCurrentDatePath");
var findUserData_1 = require("./src/user-utils/findUserData");
__createBinding(exports, findUserData_1, "default", "fetchUserData");
var jwtTokenGenerator_1 = require("./src/jwtTokenGenerator");
__createBinding(exports, jwtTokenGenerator_1, "default", "jwtTokenGenerator");
