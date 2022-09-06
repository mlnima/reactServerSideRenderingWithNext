"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settingSchema_1 = tslib_1.__importDefault(require("../../../models/settings/settingSchema"));
var simple_youtube_api_1 = tslib_1.__importDefault(require("simple-youtube-api"));
var adminScrapYoutubeInfo = function (req, res) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var url, finalData, findYoutubeApiKey, youtubeApiKey, youtube;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = req.body.url;
                finalData = [];
                return [4 /*yield*/, settingSchema_1.default.findOne({ type: 'youtubeApiKey' }).exec()];
            case 1:
                findYoutubeApiKey = _a.sent();
                youtubeApiKey = findYoutubeApiKey.data.apiKey;
                youtube = new simple_youtube_api_1.default(youtubeApiKey);
                if (url.includes('/channel/')) {
                    youtube.getChannel(url).then(function (channelData) {
                        // channelData.getVideos().then(i=>{
                        // })
                        // channelData.getVideos().then(videos=>{
                        //     res.json({videos:[...videos]})
                        // })
                    });
                }
                else if (url.includes('playlist') || url.includes('list')) {
                    youtube.getPlaylist(url).then(function (playListData) {
                        playListData.getVideos().then(function (videos) {
                            res.json({ videos: tslib_1.__spreadArray([], tslib_1.__read(videos), false) });
                        });
                    });
                }
                else {
                    youtube.getVideo(url)
                        .then(function (video) {
                        res.json({ videos: [video] });
                    })
                        .catch(function (err) {
                        res.end();
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = adminScrapYoutubeInfo;
//# sourceMappingURL=adminScrapYoutubeInfo.js.map