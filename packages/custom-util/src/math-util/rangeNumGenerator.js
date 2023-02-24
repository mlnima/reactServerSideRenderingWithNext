"use strict";
exports.__esModule = true;
// @ts-nocheck
var rangeNumGenerator = function (currentPageInput, max) {
    var currentPage = currentPageInput, // input
    range = 6, // amount of links displayed
    maxPage = max - 1, start = 2; // default
    var paging = []; // output variable
    // Don't use negative values, force start at 1
    if (currentPage < (range / 2) + 1) {
        start = 1;
        // Don't go beyond the last page
    }
    else if (currentPage >= (maxPage - (range / 2))) {
        start = Math.floor(maxPage - range + 1);
    }
    else {
        start = (currentPage - Math.floor(range / 2));
    }
    for (var i = start; i <= ((start + range) - 1); i++) {
        if (i === currentPage) {
            paging.push(i); // add brackets to indicate current page
        }
        else {
            paging.push(i);
        }
    }
    return paging;
};
exports["default"] = rangeNumGenerator;
