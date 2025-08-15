"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDRM;
var react_1 = require("react");
function useDRM(ref, drm) {
    (0, react_1.useEffect)(function () {
        if (!drm || !ref.current)
            return;
        ref.current.setAttribute('data-setup', JSON.stringify({
            html5: {
                vhs: {
                    licenseUrl: drm.licenseUrl,
                    keySystems: {
                        'com.widevine.alpha': drm.licenseUrl,
                        'com.apple.fps.1_0': drm.licenseUrl,
                    },
                },
            },
        }));
    }, [drm]);
}
//# sourceMappingURL=useDRM.js.map