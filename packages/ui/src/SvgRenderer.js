"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var Style = styled_components_1["default"].span(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  mask: url(", ") no-repeat center !important;\n  -webkit-mask: url(", ") no-repeat center !important;\n  width: ", "px;\n  height: ", "px;\n  background-color: ", ";\n  ", "\n"], ["\n  mask: url(", ") no-repeat center !important;\n  -webkit-mask: url(", ") no-repeat center !important;\n  width: ", "px;\n  height: ", "px;\n  background-color: ", ";\n  ", "\n"])), function (_a) {
    var svgUrl = _a.svgUrl;
    return svgUrl;
}, function (_a) {
    var svgUrl = _a.svgUrl;
    return svgUrl;
}, function (_a) {
    var width = _a.width, size = _a.size;
    return width || size || 48;
}, function (_a) {
    var height = _a.height, size = _a.size;
    return height || size || 48;
}, function (_a) {
    var color = _a.color;
    return color || ' var(--main-text-color, #ccc) ';
}, function (_a) {
    var customStyle = _a.customStyle;
    return customStyle;
});
var SvgRenderer = function (_a) {
    var customClassName = _a.customClassName, svgUrl = _a.svgUrl, size = _a.size, color = _a.color, customStyle = _a.customStyle, customID = _a.customID;
    var idProps = customID ? { id: customID } : {};
    var elementProps = tslib_1.__assign(tslib_1.__assign({ className: "".concat(customClassName ? customClassName : '', " icon") }, idProps), { svgUrl: svgUrl, size: size, color: color, customStyle: customStyle });
    return (react_1["default"].createElement(Style, tslib_1.__assign({}, elementProps)));
};
exports["default"] = SvgRenderer;
var templateObject_1;
