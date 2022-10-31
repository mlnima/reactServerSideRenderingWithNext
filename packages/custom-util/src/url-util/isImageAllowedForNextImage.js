"use strict";
exports.__esModule = true;
var hostnameChecker = function (hostname) {
    var splitHostname = hostname.split('.');
    return splitHostname.slice(-2).join('.');
};
//process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES
var isImageAllowedForNextImage = function (url, AllowedSources) {
    try {
        if (!!url) {
            var AllowedSource = AllowedSources ? AllowedSources.split(' ') : [];
            //@ts-ignore
            var parseUrl = new URL(url);
            return AllowedSource === null || AllowedSource === void 0 ? void 0 : AllowedSource.includes(hostnameChecker(parseUrl.hostname));
        }
    }
    catch (err) {
        return false;
    }
};
exports["default"] = isImageAllowedForNextImage;
