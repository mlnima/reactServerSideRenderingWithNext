const googleAnalyticsPageView = (url: string,googleAnalyticsId:string): void => {
    if (typeof window !== 'undefined') {
        //@ts-ignore
        window.gtag('config', googleAnalyticsId, {
            page_path: url,
        });
    }
};

 export default googleAnalyticsPageView;