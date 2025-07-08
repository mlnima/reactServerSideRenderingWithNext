import MainWidgetArea from '@components/widgets/widgetAreas/MainWidgetArea';
import { getDictionary } from '../../get-dictionary';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { IInitialSettings, IPageProps, IPageSettings } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/settings/getSettings';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import './homePage.scss';


const homePage = async (props: IPageProps) => {

  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { initialSettings, homePageSettings } = unwrapResponse(
    await getSettings(['initialSettings','homePageSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined,
      homePageSettings : IPageSettings
    }>,
  );

  const sidebar = homePageSettings?.sidebar || 'no'

  const widgets = await getWidgets(
    ['homePageLeftSidebar', 'homePageRightSidebar', 'home'],
    locale,
  );

  return (
    <div id={'content'} className={`page-${sidebar}-sidebar`}>
      <main id={'primary'} className={'main homePage'}>
        <MainWidgetArea
          dictionary={dictionary}
          locale={locale}
          widgets={widgets?.home}
          position={'home'}
          contentSettings={initialSettings?.contentSettings}
        />
      </main>

      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['homePageLeftSidebar']}
        rightSideWidgets={widgets?.['homePageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar}
        position={'postPage'}
        contentSettings={initialSettings?.contentSettings}
      />
    </div>
  );
};

export default homePage;
