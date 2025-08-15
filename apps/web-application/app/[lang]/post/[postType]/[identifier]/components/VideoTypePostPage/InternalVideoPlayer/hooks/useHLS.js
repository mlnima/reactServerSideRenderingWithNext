"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useHLS;
var tslib_1 = require("tslib");
var react_1 = require("react");
var hls_js_1 = tslib_1.__importDefault(require("hls.js"));
function useHLS(ref, source) {
    (0, react_1.useEffect)(function () {
        var video = ref.current;
        if (!video)
            return;
        if (source.type !== 'application/x-mpegURL')
            return;
        var hls;
        if (hls_js_1.default.isSupported()) {
            hls = new hls_js_1.default({ enableWorker: true, lowLatencyMode: true });
            hls.loadSource(source.src);
            hls.attachMedia(video);
        }
        else if (video.canPlayType(source.type)) {
            video.src = source.src;
        }
        return function () { return hls === null || hls === void 0 ? void 0 : hls.destroy(); };
    }, [source.src, source.type]);
}
//# sourceMappingURL=useHLS.js.map