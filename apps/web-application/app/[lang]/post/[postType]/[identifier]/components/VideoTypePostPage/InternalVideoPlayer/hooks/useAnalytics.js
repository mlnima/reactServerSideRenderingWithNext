"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useAnalytics;
var tslib_1 = require("tslib");
var react_1 = require("react");
var mux_embed_1 = tslib_1.__importDefault(require("mux-embed"));
function useAnalytics(playerRef) {
    (0, react_1.useEffect)(function () {
        var player = playerRef.current;
        if (!player)
            return;
        mux_embed_1.default.monitor(player.el(), { debug: false, data: { env_key: 'YOUR_ENV_KEY' } });
    }, []);
}
//# sourceMappingURL=useAnalytics.js.map