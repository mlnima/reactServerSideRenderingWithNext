"use strict";
exports.__esModule = true;
//was generated by AI an edited
var sortArrayByPropertyOfObject = function (array, property, ascending) {
    array.sort(function (a, b) {
        return a[property] < b[property] ?
            ascending ? -1 : 1 :
            a[property] > b[property] ?
                ascending ? 1 : -1 : 0;
        // if (a[property] < b[property]) {
        //     return ascending ? -1 : 1;
        // } else if (a[property] > b[property]) {
        //     return ascending ? 1 : -1;
        // } else {
        //     return 0;
        // }
    });
};
exports["default"] = sortArrayByPropertyOfObject;