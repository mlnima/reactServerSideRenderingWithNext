"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const fullScreenComponentsProvider_styles_1 = tslib_1.__importDefault(require("./fullScreenComponentsProvider.styles"));
const fullScreenComponentsProvider = ({ children }) => {
    return (react_1.default.createElement(fullScreenComponentsProvider_styles_1.default, null, children));
};
exports.default = fullScreenComponentsProvider;
