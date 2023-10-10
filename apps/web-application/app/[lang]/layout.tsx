import React, {ReactNode} from 'react';
import '@components/global/styles/global.styles.scss'
// import dynamic from "next/dynamic";
import {fetchSettings, fetchWidgets} from "fetch-requests";
import ReduxProvider from "@store/ReduxProvider";
import * as process from "process";
import {i18n} from '@i18nConfig'
import {getDictionary} from "../../get-dictionary";
import GlobalCustomStyles from "@components/global/styles/GlobalCustomStyles";
import LayoutMetaGenerator from "../components/LayoutMetaGenerator/LayoutMetaGenerator";
import LoginRegisterPopup from "@components/LoginRegisterPopup/LoginRegisterPopup";
import UserAutoLogin from "@components/UserAutoLogin";
import BackToTopButton from "@components/BackToTopButton/BackToTopButton";
import LoadingComponent from "@components/LoadingComponent/LoadingComponent";
import CookiesInformerBar from "@components/CookiesInformerBar/CookiesInformerBar";
import AlertBox from "@components/AlertBox/AlertBox";
import GoogleAnalytics from "@components/GoogleAnalytics/GoogleAnalytics";
import WebSocketInitializer from "@components/WebSocketInitializer/WebSocketInitializer";
import StoreDataInitializer from "@components/global/StoreDataInitializer";
// import MediaCall from "@components/MediaCall/MediaCall";
import TopbarWidgetArea from "@components/widgets/widgetAreas/TopbarWidgetArea";
import HeaderWidgetArea from "@components/widgets/widgetAreas/HeaderWidgetArea";
import NavigationWidgetArea from "@components/widgets/widgetAreas/NavigationWidgetArea";
import FooterWidgetArea from "@components/widgets/widgetAreas/FooterWidgetArea";
import {rtlLanguages} from "data-structures";

export async function generateStaticParams() {
    return i18n.locales.map((lng: string) => ({lng}))
}


const RootLayout = async ({children, params: {lang}}: { children: ReactNode, params: { lang: string } }) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
    const dictionary = await getDictionary(locale)
    const initialSettingsData = await fetchSettings({requireSettings: ['initialSettings']})
    const initialSettings = initialSettingsData?.settings?.initialSettings
    const staticWidgetsData = await fetchWidgets(['footer', 'header', 'topBar', 'navigation'], locale)


//dir={rtlLanguages.includes(locale) ? 'rtl' : 'ltr'}
    return (
        <html lang={locale} >
        <body className={`dark `} >
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
            <CookiesInformerBar/>
            <UserAutoLogin/>

            <GoogleAnalytics googleAnalyticsId={initialSettings?.headDataSettings?.googleAnalyticsId}/>
            <LoadingComponent/>
            <AlertBox dictionary={dictionary}/>
            <BackToTopButton/>
            <LoginRegisterPopup locale={locale} dictionary={dictionary}/>
            <GlobalCustomStyles customColors={initialSettingsData?.settings?.layoutSettings?.customColors}
                                customStyles={initialSettingsData?.settings?.layoutSettings?.customStyles}/>
            <StoreDataInitializer initialSettings={initialSettings}/>
            <WebSocketInitializer/>
            {/*<MediaCall/>*/}
        </ReduxProvider>
        </body>
        </html>
    )
}

export default RootLayout;


export const generateMetadata = LayoutMetaGenerator;
// export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
