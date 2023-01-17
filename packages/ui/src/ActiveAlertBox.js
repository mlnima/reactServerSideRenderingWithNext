"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var react_1 = tslib_1.__importDefault(require("react"));
var Style = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: var(--main-text-color, #fff);\n  background-color: rgba(0,0,0,.6);\n  z-index: 1010;\n\n  .alert-message {\n    min-width: 300px;\n    max-width: 600px;\n    background-color: var(--secondary-background-color, #181818);\n    padding: 0;\n    border-radius: 5px;\n\n    .alert-message-header {\n      background-color: var( --main-text-color, #fff);\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      border-radius: 5px 5px 0 0;\n      padding: 5px 0;\n\n      .close-alert {\n        color: var(--main-text-color, #fff);;\n        background-color: transparent;\n        border: none;\n        height: 25px;\n        width: 40px;\n        display: flex;\n        justify-content: center;\n      }\n\n      .alert-type {\n        padding: 0 10px;\n        margin: 0;\n        height: 25px;\n        width: 25px;\n        display: flex;\n        justify-content: center;\n\n        .icon {\n          width: 25px;\n          height: 25px;\n        }\n      }\n    }\n\n    .alert {\n      text-align: center;\n      padding: 10px;\n    }\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: var(--main-text-color, #fff);\n  background-color: rgba(0,0,0,.6);\n  z-index: 1010;\n\n  .alert-message {\n    min-width: 300px;\n    max-width: 600px;\n    background-color: var(--secondary-background-color, #181818);\n    padding: 0;\n    border-radius: 5px;\n\n    .alert-message-header {\n      background-color: var( --main-text-color, #fff);\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      border-radius: 5px 5px 0 0;\n      padding: 5px 0;\n\n      .close-alert {\n        color: var(--main-text-color, #fff);;\n        background-color: transparent;\n        border: none;\n        height: 25px;\n        width: 40px;\n        display: flex;\n        justify-content: center;\n      }\n\n      .alert-type {\n        padding: 0 10px;\n        margin: 0;\n        height: 25px;\n        width: 25px;\n        display: flex;\n        justify-content: center;\n\n        .icon {\n          width: 25px;\n          height: 25px;\n        }\n      }\n    }\n\n    .alert {\n      text-align: center;\n      padding: 10px;\n    }\n  }\n"])));
var ActiveAlertBox = function (_a) {
    var _b, _c;
    var alert = _a.alert, closeAlert = _a.closeAlert;
    return (react_1["default"].createElement(Style, { className: 'alert-box', onClick: function () { return closeAlert(); } },
        react_1["default"].createElement("div", { className: 'alert-message' },
            react_1["default"].createElement("div", { className: 'alert-message-header handle' },
                react_1["default"].createElement("p", { className: 'alert-type' }, alert.type === 'success' ? 'OK' : alert.type === 'error' ? 'X' : '!'),
                react_1["default"].createElement("button", { className: 'close-alert', onClick: function () { return closeAlert(); } },
                    react_1["default"].createElement("span", { className: 'icon faTimes' }),
                    "X")),
            react_1["default"].createElement("p", { className: 'alert' }, alert.message),
            !!((_b = alert.err) === null || _b === void 0 ? void 0 : _b.stack) && react_1["default"].createElement("p", null, (_c = alert.err) === null || _c === void 0 ? void 0 : _c.stack))));
};
exports["default"] = ActiveAlertBox;
var templateObject_1;
