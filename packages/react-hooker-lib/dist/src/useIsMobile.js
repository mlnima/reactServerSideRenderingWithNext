"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = require("react");
var useIsMobile = function (breakpoint) {
    if (breakpoint === void 0) { breakpoint = 768; }
    var _a = tslib_1.__read((0, react_1.useState)(null), 2), isMobile = _a[0], setIsMobile = _a[1];
    (0, react_1.useEffect)(function () {
        var checkIsMobile = function () {
            setIsMobile(window.innerWidth < breakpoint);
        };
        // Check if the window object is available
        if (typeof window !== 'undefined') {
            checkIsMobile(); // Set initial mobile status
            window.addEventListener('resize', checkIsMobile); // Update mobile status on window resize
            // Clean up the event listener on component unmount
            return function () {
                window.removeEventListener('resize', checkIsMobile);
            };
        }
    }, [breakpoint]);
    return isMobile;
};
exports["default"] = useIsMobile;
