"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var faUser_1 = require("@fortawesome/free-solid-svg-icons/faUser");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var Style = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  .user-preview-image {\n    border-radius: 50%;\n    box-sizing: border-box;\n    cursor: pointer;\n  }\n\n  .user-preview-image-icon {\n    cursor: pointer;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n  .user-preview-image {\n    border-radius: 50%;\n    box-sizing: border-box;\n    cursor: pointer;\n  }\n\n  .user-preview-image-icon {\n    cursor: pointer;\n  }\n"])));
var UserPreviewImage = function (_a) {
    var imageUrl = _a.imageUrl, size = _a.size;
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), gotError = _b[0], setGotError = _b[1];
    return (react_1["default"].createElement(Style, null, !!imageUrl && !gotError ?
        react_1["default"].createElement("img", { className: 'user-preview-image', src: imageUrl, onError: function () { return setGotError(true); }, style: { width: size, height: size }, alt: 'profile image' }) :
        react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: faUser_1.faUser, className: 'user-preview-image-icon', style: { width: size, height: size, color: ' var(--main-text-color, #fff)' } })));
};
exports["default"] = UserPreviewImage;
var templateObject_1;
