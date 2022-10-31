"use strict";
exports.__esModule = true;
var reduceArrayOfDataToIds = function (dataArr) { return Array.isArray(dataArr) ? dataArr.map(function (data) { return data._id; }) : []; };
exports["default"] = reduceArrayOfDataToIds;
