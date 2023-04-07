import {FC, useEffect} from "react";
import Script from 'next/script'
import {useRouter} from "next/router";

interface GoogleAnalyticsPropTypes {
    googleAnalyticsId: string
}

const GoogleAnalytics: FC<GoogleAnalyticsPropTypes> = ({googleAnalyticsId}) => {
    const {asPath,events} = useRouter()

    const handleRouteChange = (url) => {
        if (typeof window !== 'undefined'){
            //@ts-ignore
            if (window?.gtag){
                //@ts-ignore
                window?.gtag('config', googleAnalyticsId, {
                    page_path: url,
                });
            }
        }
    };

    useEffect(() => {
        events.on('routeChangeComplete', handleRouteChange);
        return () => {
            events.off('routeChangeComplete', handleRouteChange);
        };
    }, [asPath]);


    console.log('googleAnalyticsId:',googleAnalyticsId)

    return (
        <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                    strategy={'afterInteractive'}
            />
            <Script id={'google-analytics'}
                    strategy={'afterInteractive'}
            >
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer?.push(arguments)}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
                `}
            </Script>
        </>
    )

};
export default GoogleAnalytics
