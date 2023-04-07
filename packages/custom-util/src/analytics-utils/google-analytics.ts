export const pageView = (url: string,googleAnalyticsId:string): void => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('config', googleAnalyticsId, {
            page_path: url,
        });
    }
};

interface IEvent {
    action: string;
    category: string;
    label: string;
    value?: number;
}

export const event = ({ action, category, label, value }: IEvent): void => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
