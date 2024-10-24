import React, { ReactNode } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ServerSideStore from '@store/ServerSideStore';
config.autoAddCss = false;
import '@components/global/styles/global.styles.scss';
import { fetchSettings } from '@lib/fetch-requests/fetchSettings';
import { fetchWidgets } from '@lib/fetch-requests/fetchWidgets';
import ReduxProvider from '@store/ReduxProvider';
import { i18n } from '@i18nConfig';
import { getDictionary } from '../../get-dictionary';
import GlobalCustomStyles from '@components/global/styles/GlobalCustomStyles';
import LayoutMetaGenerator from '../components/LayoutMetaGenerator/LayoutMetaGenerator';
import LoginRegisterPopup from '@components/global/LoginRegisterPopup/LoginRegisterPopup';
import UserAutoLogin from '@components/global/UserAutoLogin';
import BackToTopButton from '@components/global/BackToTopButton/BackToTopButton';
import LoadingComponent from '@components/global/LoadingComponent/LoadingComponent';
import CookiesInformerBar from '@components/global/CookiesInformerBar/CookiesInformerBar';
import AlertBox from '@components/global/AlertBox/AlertBox';
import GoogleAnalytics from '@components/global/GoogleAnalytics/GoogleAnalytics';
import WebSocketInitializer from '@components/global/WebSocketInitializer/WebSocketInitializer';
import StoreDataInitializer from '@components/global/StoreDataInitializer';
import TopbarWidgetArea from '@components/widgets/widgetAreas/TopbarWidgetArea';
import HeaderWidgetArea from '@components/widgets/widgetAreas/HeaderWidgetArea';
import NavigationWidgetArea from '@components/widgets/widgetAreas/NavigationWidgetArea';
import FooterWidgetArea from '@components/widgets/widgetAreas/FooterWidgetArea';
import StyledComponentsRegistry from '@lib/registry';
import BackgroundFilterWholeScreen from '@components/global/BackgroundFilterWholeScreen/BackgroundFilterWholeScreen';
import KeysListener from '@components/global/KeysListener';
import UserConfigMenu from '@components/global/UserConfigMenu/UserConfigMenu';
import LayoutViewportGenerator from '@components/LayoutMetaGenerator/LayoutViewportGenerator';
import CustomScripts from '@components/CustomScripts';
import CustomHeadTagsInitializer from '@components/CustomHeadTagsInitializer';

export async function generateStaticParams() {
    return i18n.locales.map((lng: string) => ({ lng }));
}
//: { children: ReactNode; params: { lang: string } }
const RootLayout = async ({ children, params }) => {
    const { lang } = await params;
    const locale = i18n.locales.includes(lang) ? lang : process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale);


    const initialSettingsData = await fetchSettings({
        requireSettings: ['initialSettings'],
    });

    const initialSettings = initialSettingsData?.settings?.initialSettings;
    ServerSideStore.setInitialSettings(initialSettings);

    const staticWidgetsData = await fetchWidgets({
        widgets: ['footer', 'header', 'topBar', 'navigation'],
        locale,
    });

    //dir={rtlLanguages.includes(locale) ? 'rtl' : 'ltr'}

    const widgetAreasSharedProps ={
        locale,
        dictionary,
    }

    return (
        <html lang={locale}>
            <body className={`dark `} style={{}}>
                <ReduxProvider>
                    <div className="layout">
                        {initialSettings?.layoutSettings?.topbar && (
                            <TopbarWidgetArea {...widgetAreasSharedProps} widgets={staticWidgetsData?.widgets?.topBar} />
                        )}
                        {initialSettings?.layoutSettings?.header && (
                            <HeaderWidgetArea {...widgetAreasSharedProps} widgets={staticWidgetsData?.widgets?.header} />
                        )}
                        {initialSettings?.layoutSettings?.navigation && (
                            <NavigationWidgetArea
                                {...widgetAreasSharedProps}
                                widgets={staticWidgetsData?.widgets?.navigation}
                            />
                        )}
                        <div id={'page'} className={'App'}>
                            {children}
                        </div>
                        {initialSettings?.layoutSettings?.footer && (
                            <FooterWidgetArea {...widgetAreasSharedProps} widgets={staticWidgetsData?.widgets?.footer} />
                        )}
                    </div>
                    <BackgroundFilterWholeScreen />
                    <CookiesInformerBar />
                    <UserAutoLogin />
                    <GoogleAnalytics googleAnalyticsId={initialSettings?.headDataSettings?.googleAnalyticsId} />
                    <LoadingComponent />
                    <AlertBox dictionary={dictionary} />
                    <BackToTopButton />
                    <LoginRegisterPopup locale={locale} dictionary={dictionary} />
                    <StyledComponentsRegistry>
                        <GlobalCustomStyles
                            primaryModeColors={initialSettings?.layoutSettings?.primaryModeColors}
                            customStyles={initialSettings?.layoutSettings?.customStyles}
                        />
                    </StyledComponentsRegistry>
                    <StoreDataInitializer initialSettings={initialSettings} />
                    <WebSocketInitializer />
                    {/*<MediaCall/>*/}
                    <KeysListener />
                    <UserConfigMenu locale={locale} dictionary={dictionary} />
                    <CustomHeadTagsInitializer />
                    <CustomScripts />
                </ReduxProvider>
            </body>
        </html>
    );
};

export default RootLayout;

export const generateMetadata = LayoutMetaGenerator;

export const generateViewport = LayoutViewportGenerator;
// export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
