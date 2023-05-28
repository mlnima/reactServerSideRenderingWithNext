interface IEvent {
    action: string;
    category: string;
    label: string;
    value?: number;
}

const googleAnalyticsEvent = ({ action, category, label, value }: IEvent): void => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

export default googleAnalyticsEvent;