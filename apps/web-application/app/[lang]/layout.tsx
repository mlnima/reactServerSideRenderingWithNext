import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
//import ServerSideStore from '@store/ServerSideStore';
config.autoAddCss = false;
import '@components/global/styles/global.styles.scss';
import ReduxProvider from '@store/ReduxProvider';
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
import { ILayoutProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import { getWidgets } from '@lib/database/operations/widgets';
import { getSettings } from '@lib/database/operations/settings';

// export async function generateStaticParams() {
//     return i18n.locales.map((lng: string) => ({ lng }));
// }



const RootLayout = async (props: ILayoutProps) => {

  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { initialSettings } = await getSettings(['initialSettings']);

  const widgets = await getWidgets(
    ['footer', 'header', 'topBar', 'navigation'],
    locale
  );

  const widgetAreasSharedProps = {
    locale,
    dictionary,
  };

  return (
    <html lang={locale}>
      <body className={`dark `} style={{}}>
        <ReduxProvider>
          <div className="layout">
            {initialSettings?.layoutSettings?.topbar && (
              <TopbarWidgetArea
                {...widgetAreasSharedProps}
                widgets={widgets?.topBar}
              />
            )}
            {initialSettings?.layoutSettings?.header && (
              <HeaderWidgetArea
                {...widgetAreasSharedProps}
                widgets={widgets?.header}
              />
            )}
            {initialSettings?.layoutSettings?.navigation && (
              <NavigationWidgetArea
                {...widgetAreasSharedProps}
                widgets={widgets?.navigation}
              />
            )}
            <div id={'page'} className={'App'}>
              {props.children}
            </div>
            {initialSettings?.layoutSettings?.footer && (
              <FooterWidgetArea
                {...widgetAreasSharedProps}
                widgets={widgets?.footer}
              />
            )}
          </div>
          <BackgroundFilterWholeScreen />
          <CookiesInformerBar />
          <UserAutoLogin />
          <GoogleAnalytics
            googleAnalyticsId={
              initialSettings?.headDataSettings?.googleAnalyticsId
            }
          />
          <LoadingComponent />
          <AlertBox dictionary={dictionary} />
          <BackToTopButton />
          <LoginRegisterPopup locale={locale} dictionary={dictionary} />
          <StyledComponentsRegistry>
            <GlobalCustomStyles
              primaryModeColors={
                initialSettings?.layoutSettings?.primaryModeColors
              }
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
