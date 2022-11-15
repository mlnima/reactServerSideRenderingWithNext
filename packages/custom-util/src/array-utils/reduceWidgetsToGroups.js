"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var reduceWidgetsToGroups = function (widgets) {
    return widgets.reduce(function (widgetInPositions, widget) {
        widgetInPositions[widget.data.position] = tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read((widgetInPositions[widget.data.position] || [])), false), [widget], false);
        return widgetInPositions;
    }, {});
};
exports["default"] = reduceWidgetsToGroups;
