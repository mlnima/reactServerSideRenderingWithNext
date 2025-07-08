import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;
import '@components/global/styles/global.styles.scss';
import ReduxProvider from '@store/ReduxProvider';
import { getDictionary } from '../../get-dictionary';
import LayoutMetaGenerator from '@components/LayoutMetaGenerator/LayoutMetaGenerator';
import LoginRegisterPopup from '@components/global/LoginRegisterPopup/LoginRegisterPopup';
import BackToTopButton from '@components/global/BackToTopButton/BackToTopButton';
import LoadingComponent from '@components/global/LoadingComponent/LoadingComponent';
import AlertBox from '@components/global/AlertBox/AlertBox';
import GoogleAnalytics from '@components/global/GoogleAnalytics/GoogleAnalytics';
import WebSocketInitializer from '@components/global/WebSocketInitializer/WebSocketInitializer';
import StoreDataInitializer from '@components/global/StoreDataInitializer';
import TopbarWidgetArea from '@components/widgets/widgetAreas/TopbarWidgetArea';
import HeaderWidgetArea from '@components/widgets/widgetAreas/HeaderWidgetArea';
import NavigationWidgetArea from '@components/widgets/widgetAreas/NavigationWidgetArea';
import FooterWidgetArea from '@components/widgets/widgetAreas/FooterWidgetArea';
import BackgroundFilterWholeScreen from '@components/global/BackgroundFilterWholeScreen/BackgroundFilterWholeScreen';
import KeysListener from '@components/global/KeysListener';
import UserConfigMenu from '@components/global/UserConfigMenu/UserConfigMenu';
import LayoutViewportGenerator from '@components/LayoutMetaGenerator/LayoutViewportGenerator';
import CustomScripts from '@components/CustomScripts';
import CustomHeadTagsInitializer from '@components/CustomHeadTagsInitializer';
import { IInitialSettings, ILayoutProps, IWidget } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import getSettings from '@lib/actions/database/settings/getSettings';
import MemberInitializer from '@components/global/MemberInitializer/MemberInitializer';
import CookieInitializer from '@components/global/CookieInitializer/CookieInitializer';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import DynamicStyleInjector from '@components/global/DynamicStyleInjector';
import CustomStylesSwitcher from '@components/global/styles/CustomStylesSwitcher';
import React from 'react';


const RootLayout = async (props: ILayoutProps) => {

  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined
    }>,
  );

  const widgets = await getWidgets(
    ['footer', 'header', 'topBar', 'navigation'],
    locale,
  ) as { [key: string]: IWidget[] };

  const widgetAreasSharedProps = {
    locale,
    dictionary,
  };

  return (
    <html lang={locale}>
    <body>
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
        <div id={'page'} className={'App innerContent'}>
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
      <CookieInitializer />
      <MemberInitializer />
      {initialSettings?.headDataSettings?.googleAnalyticsId &&
        <GoogleAnalytics
          googleAnalyticsId={
            initialSettings?.headDataSettings?.googleAnalyticsId
          }
        />
      }
      <LoadingComponent />
      <AlertBox dictionary={dictionary} />
      <BackToTopButton />
      <LoginRegisterPopup locale={locale} dictionary={dictionary} />
      <CustomStylesSwitcher />
      {initialSettings?.layoutSettings?.customStyles &&
        <DynamicStyleInjector
          styles={initialSettings?.layoutSettings?.customStyles}
          id="customStyles"
          enableScss={true}
        />
      }
      {initialSettings?.layoutSettings?.primaryModeColors &&
        <DynamicStyleInjector
          styles={initialSettings?.layoutSettings?.primaryModeColors}
          id="primaryModeColors"
          enableScss={true}
        />
      }


      {initialSettings && <StoreDataInitializer initialSettings={initialSettings} />}
      <WebSocketInitializer />
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


// <MediaCall/>


// {/*<StyledComponentsRegistry>*/}
// {/*  <CustomStylesSwitcher*/}
// {/*    primaryModeColors={*/}
// {/*      initialSettings?.layoutSettings?.primaryModeColors || ''*/}
// {/*    }*/}
// {/*    customStyles={initialSettings?.layoutSettings?.customStyles}*/}
// {/*  />*/}
// {/*</StyledComponentsRegistry>*/}