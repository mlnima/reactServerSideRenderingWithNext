import React, {ReactNode} from 'react';
import '@components/global/styles/globale.styles.scss'
import dynamic from "next/dynamic";
import {fetchSettings, fetchWidgets} from "fetch-requests";
import ReduxProvider from "@store/ReduxProvider";
import Csr from "@components/global/Csr";
import * as process from "process";
import {i18n} from '../../i18n-config'
import {getDictionary} from "../../get-dictionary";
import GlobalCustomStyles from "@components/global/styles/GlobalCustomStyles";
import LayoutMetaGenerator from   "../components/LayoutMetaGenerator/LayoutMetaGenerator";

const TopbarWidgetArea = dynamic(() => import("@components/widgets/widgetAreas/TopbarWidgetArea"))
const HeaderWidgetArea = dynamic(() => import("@components/widgets/widgetAreas/HeaderWidgetArea"))
const NavigationWidgetArea = dynamic(() => import("@components/widgets/widgetAreas/NavigationWidgetArea"))
const FooterWidgetArea = dynamic(() => import("@components/widgets/widgetAreas/FooterWidgetArea"))

export async function generateStaticParams() {
    return i18n.locales.map((lng: string) => ({lng}))
}

export const generateMetadata = LayoutMetaGenerator

const RootLayout = async ({children, params: {lang}}: { children: ReactNode, params: { lang: string } }) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en'
    const dictionary = await getDictionary(locale)
    const initialSettingsData = await fetchSettings(['initialSettings'])
    const staticWidgetsData = await fetchWidgets(['footer', 'header', 'topBar', 'navigation'], locale)

    return (
        <html lang={locale}>
        <body className={`dark `}>
        <ReduxProvider>
            <div className="flex flex-col min-h-screen">
                {initialSettingsData?.settings?.initialSettings?.layoutSettings?.topbar &&
                    <TopbarWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.topBar}
                                      locale={locale}/>}
                {initialSettingsData?.settings?.initialSettings?.layoutSettings?.header &&
                    <HeaderWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.header}
                                      locale={locale}/>}
                {initialSettingsData?.settings?.initialSettings?.layoutSettings?.navigation &&
                    <NavigationWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.navigation}
                                          locale={locale}/>}
                <div id={'page'} className={'App'}>
                    {children}
                </div>
                {initialSettingsData?.settings?.initialSettings?.layoutSettings?.footer &&
                    <FooterWidgetArea dictionary={dictionary} widgets={staticWidgetsData?.widgets?.footer}
                                      locale={locale}/>}
            </div>
            {/*<WebSocketInitializer/>*/}
            <Csr>
                <GlobalCustomStyles customColors={initialSettingsData?.settings?.layoutSettings?.customColors}
                                    customStyles={initialSettingsData?.settings?.layoutSettings?.customStyles}/>
            </Csr>
        </ReduxProvider>
        </body>
        </html>
    )
}

export default RootLayout;