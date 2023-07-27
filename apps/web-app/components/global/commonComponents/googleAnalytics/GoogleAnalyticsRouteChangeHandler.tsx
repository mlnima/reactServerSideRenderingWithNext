import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {googleAnalyticsEvent,googleAnalyticsPageView} from 'custom-util'



interface PropTypes {
    googleAnalyticsId:string
}

const GoogleAnalyticsRouteChangeHandler: FC<PropTypes> = ({googleAnalyticsId}) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            googleAnalyticsPageView(url,googleAnalyticsId);
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
