"use strict";
exports.__esModule = true;
exports.event = exports.pageView = void 0;
var pageView = function (url, googleAnalyticsId) {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('config', googleAnalyticsId, {
            page_path: url
        });
    }
};
exports.pageView = pageView;
var event = function (_a) {
    var action = _a.action, category = _a.category, label = _a.label, value = _a.value;
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
};
exports.event = event;
