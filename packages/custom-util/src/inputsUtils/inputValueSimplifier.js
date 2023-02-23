"use strict";
exports.__esModule = true;
var inputValueSimplifier = function (event) {
    var _a;
    return ((_a = event.target) === null || _a === void 0 ? void 0 : _a.type) === 'checkbox' ? event.target.checked :
        event.target.value === 'true' ? true :
            event.target.value === 'false' ? false :
                event.target.value;
};
exports["default"] = inputValueSimplifier;
