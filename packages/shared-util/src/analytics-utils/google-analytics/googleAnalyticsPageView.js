const googleAnalyticsPageView = (url, googleAnalyticsId) => {
    if (typeof window !== 'undefined') {
        window.gtag('config', googleAnalyticsId, {
            page_path: url,
        });
    }
};

module.exports = googleAnalyticsPageView;
