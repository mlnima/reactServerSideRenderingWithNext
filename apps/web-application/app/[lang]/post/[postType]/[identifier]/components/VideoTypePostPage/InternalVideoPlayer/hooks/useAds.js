"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAds;
var react_1 = require("react");
require("videojs-contrib-ads");
require("videojs-ima");
function useAds(playerRef, ads) {
    (0, react_1.useEffect)(function () {
        var player = playerRef.current;
        if (!player || !ads)
            return;
        player.ima({ adTagUrl: ads.tag });
    }, [ads]);
}
//# sourceMappingURL=useAds.js.map