export declare const pageView: (url: string, googleAnalyticsId: string) => void;
interface IEvent {
    action: string;
    category: string;
    label: string;
    value?: number;
}
export declare const event: ({ action, category, label, value }: IEvent) => void;
export {};
//# sourceMappingURL=google-analytics.d.ts.map