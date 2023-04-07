import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import * as ga from 'custom-util/src/analytics-utils/google-analytics';


interface PropTypes {
    googleAnalyticsId:string
}

const GoogleAnalyticsRouteChangeHandler: FC<PropTypes> = ({googleAnalyticsId}) => {
    console.log('GoogleAnalyticsRouteChangeHandler')
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            ga.pageView(url,googleAnalyticsId);
        };

        // When the route changes, call `handleRouteChange`
        router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup: remove the listener when the component is unmounted
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return null
};
export default GoogleAnalyticsRouteChangeHandler
