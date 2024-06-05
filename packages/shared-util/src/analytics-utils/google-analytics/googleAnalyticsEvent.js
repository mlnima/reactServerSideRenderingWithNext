const googleAnalyticsEvent = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

module.exports = googleAnalyticsEvent;
