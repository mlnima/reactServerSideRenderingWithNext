"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_loading_1 = tslib_1.__importDefault(require("react-loading"));
var react_1 = tslib_1.__importDefault(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var Style = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n\n  .stop-loading {\n    position: fixed;\n    top: 100px;\n    right: 100px;\n    background-color: transparent;\n    border: none;\n    outline: none;\n    color: white;\n    z-index: 10;\n    width: 50px;\n    height: 50px;\n\n    &:hover {\n      color: #916d07;\n    }\n\n    .stop-loading-icon {\n      width: 2rem !important;\n      height: 2rem !important;\n      color: var(--main-active-color, #f90);\n      cursor: pointer;\n    }\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n\n  .stop-loading {\n    position: fixed;\n    top: 100px;\n    right: 100px;\n    background-color: transparent;\n    border: none;\n    outline: none;\n    color: white;\n    z-index: 10;\n    width: 50px;\n    height: 50px;\n\n    &:hover {\n      color: #916d07;\n    }\n\n    .stop-loading-icon {\n      width: 2rem !important;\n      height: 2rem !important;\n      color: var(--main-active-color, #f90);\n      cursor: pointer;\n    }\n  }\n"])));
var ActiveLoading = function (_a) {
    var onClickEvent = _a.onClickEvent, color = _a.color;
    return (react_1["default"].createElement(Style, { onClick: onClickEvent, onTouchStartCapture: onClickEvent },
        react_1["default"].createElement(react_loading_1["default"], { type: 'spin', color: color, height: 100, width: 100 })));
};
exports["default"] = ActiveLoading;
var templateObject_1;
