export const googleAnalyticsEvent = (
  { action, category, label, value }: { action: string; category: string; label?: string; value?: number }
) => {
  if (typeof window !== 'undefined') {
    // @ts-expect-error: its fine
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};


export const googleAnalyticsPageView = (url: string, googleAnalyticsId: string) => {
  if (typeof window !== 'undefined') {
    // @ts-expect-error: its fine
    window.gtag('config', googleAnalyticsId, {
      page_path: url,
    });
  }
};