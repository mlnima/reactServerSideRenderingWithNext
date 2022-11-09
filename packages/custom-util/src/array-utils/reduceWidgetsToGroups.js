"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var reduceWidgetsToGroups = function (widgets) {
    return widgets.reduce(function (widgetInPositions, widget) {
        widgetInPositions[widget.data.position] = __spreadArray(__spreadArray([], (widgetInPositions[widget.data.position] || []), true), [widget], false);
        return widgetInPositions;
    }, {});
};
exports["default"] = reduceWidgetsToGroups;
