import {FC} from "react";
import Script from "next/script";

interface PropTypes {
    googleAnalyticsId:string
}

const GoogleAnalyticsHeadScript: FC<PropTypes> = ({googleAnalyticsId}) => {
    console.log('GoogleAnalyticsHeadScript')
    return (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                    // strategy={'afterInteractive'}
            />
            <script id={'google-analytics'}
                    // strategy={'afterInteractive'}
            >
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer?.push(arguments)}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
                `}
            </script>
        </>
)
}

export default GoogleAnalyticsHeadScript