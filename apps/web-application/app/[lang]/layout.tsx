import React, {ReactNode} from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css'
import {config} from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
import '@components/global/styles/global.styles.scss'
import {fetchSettings} from "@lib/fetch-requests/client/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/client/fetchWidgets";
import ReduxProvider from "@store/ReduxProvider";
import * as process from "process";
import {i18n} from '@i18nConfig'
import {getDictionary} from "../../get-dictionary";
import GlobalCustomStyles from "@components/global/styles/GlobalCustomStyles";
import LayoutMetaGenerator from "../components/LayoutMetaGenerator/LayoutMetaGenerator";
import LoginRegisterPopup from "@components/global/LoginRegisterPopup/LoginRegisterPopup";
import UserAutoLogin from "@components/global/UserAutoLogin";
import BackToTopButton from "@components/global/BackToTopButton/BackToTopButton";
import LoadingComponent from "@components/global/LoadingComponent/LoadingComponent";
import CookiesInformerBar from "@components/global/CookiesInformerBar/CookiesInformerBar";
import AlertBox from "@components/global/AlertBox/AlertBox";
import GoogleAnalytics from "@components/global/GoogleAnalytics/GoogleAnalytics";
import WebSocketInitializer from "@components/global/WebSocketInitializer/WebSocketInitializer";
import StoreDataInitializer from "@components/global/StoreDataInitializer";
import TopbarWidgetArea from "@components/widgets/widgetAreas/TopbarWidgetArea";
import HeaderWidgetArea from "@components/widgets/widgetAreas/HeaderWidgetArea";
import NavigationWidgetArea from "@components/widgets/widgetAreas/NavigationWidgetArea";
import FooterWidgetArea from "@components/widgets/widgetAreas/FooterWidgetArea";
import StyledComponentsRegistry from "@lib/registry";
import BackgroundFilterWholeScreen from "@components/global/BackgroundFilterWholeScreen/BackgroundFilterWholeScreen";
import KeysListener from "@components/global/KeysListener";
import UserConfigMenu from "@components/global/UserConfigMenu/UserConfigMenu";
import type { Viewport } from 'next'
import LayoutViewportGenerator from "@components/LayoutMetaGenerator/LayoutViewportGenerator";
// import './layout.scss'
// import Head from "next/head";

// import {rtlLanguages} from "@repo/data-structures";
// import MediaCall from "@components/MediaCall/MediaCall";
// import dynamic from "next/dynamic";


export async function generateStaticParams() {
    return i18n.locales.map((lng: string) => ({lng}))
}


const RootLayout = async ({children, params: {lang}}: { children: ReactNode, params: { lang: string } }) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
    const dictionary = await getDictionary(locale)
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const initialSettings = initialSettingsData?.settings?.initialSettings

    const staticWidgetsData = await fetchWidgets({
        widgets: [
            'footer',
            'header',
            'topBar',
            'navigation'
        ],
        locale
    });

//dir={rtlLanguages.includes(locale) ? 'rtl' : 'ltr'}
    return (
        <html lang={locale}>
        {/*<Head>*/}
        {/*    <link rel="stylesheet" href={dom.css()}/>*/}
        {/*</Head>*/}
        <body className={`dark `} style={{}}>
        <ReduxProvider>

            <div className="layout">
                {initialSettings?.layoutSettings?.topbar &&
                    <TopbarWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.topBar}
                                      locale={locale}/>}
                {initialSettings?.layoutSettings?.header &&
                    <HeaderWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.header}
                                      locale={locale}/>}
                {initialSettings?.layoutSettings?.navigation &&
                    <NavigationWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.navigation}
                                          locale={locale}/>}
                <div id={'page'} className={'App'}>
                    {children}
                </div>
                {initialSettings?.layoutSettings?.footer &&
                    <FooterWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.footer}
                                      locale={locale}/>}
            </div>
            <BackgroundFilterWholeScreen/>
            <CookiesInformerBar/>
            <UserAutoLogin/>
            <GoogleAnalytics googleAnalyticsId={initialSettings?.headDataSettings?.googleAnalyticsId}/>
            <LoadingComponent/>
            <AlertBox dictionary={dictionary}/>
            <BackToTopButton/>
            <LoginRegisterPopup locale={locale} dictionary={dictionary}/>
            <StyledComponentsRegistry>
                <GlobalCustomStyles primaryModeColors={initialSettings?.layoutSettings?.primaryModeColors}
                                    customStyles={initialSettings?.layoutSettings?.customStyles}/>
            </StyledComponentsRegistry>
            <StoreDataInitializer initialSettings={initialSettings}/>
            <WebSocketInitializer/>
            {/*<MediaCall/>*/}
            <KeysListener/>
            <UserConfigMenu locale={locale} dictionary={dictionary}/>
        </ReduxProvider>
        </body>
        </html>
    )
}

export default RootLayout;


export const generateMetadata = LayoutMetaGenerator;

export const generateViewport = LayoutViewportGenerator;
// export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
