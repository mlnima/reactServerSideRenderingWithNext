'use client';
import { FC } from 'react';
import Script from 'next/script';

interface GoogleAnalyticsPropTypes {
    googleAnalyticsId: string;
}

const GoogleAnalytics: FC<GoogleAnalyticsPropTypes> = ({ googleAnalyticsId }) => {
    return (
        <>
            <Script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                strategy={'afterInteractive'}
            />
            <Script id={'google-analytics'} strategy={'afterInteractive'}>
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer?.push(arguments)}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
                `}
            </Script>
        </>
    );
};
export default GoogleAnalytics;
