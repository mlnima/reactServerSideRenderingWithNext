export const googleAnalyticsEvent = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export const googleAnalyticsPageView = (url, googleAnalyticsId) => {
    if (typeof window !== 'undefined') {
        window.gtag('config', googleAnalyticsId, {
            page_path: url,
        });
    }
};