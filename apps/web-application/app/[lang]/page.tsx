import MainWidgetArea from '@components/widgets/widgetAreas/MainWidgetArea';
import { getDictionary } from '../../get-dictionary';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { IPageProps, IPageSettings } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import { ServerActionResponse } from '@lib/actions/response';
import './homePage.scss';


const homePage = async (props: IPageProps) => {

  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const {
    data: {
      homePageSettings: { sidebar = 'no' } = {},
    } = {},
  } = await getSettings(['homePageSettings']) as unknown as ServerActionResponse<{
    homePageSettings: IPageSettings
  }>;

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
        />
      </main>

      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['homePageLeftSidebar']}
        rightSideWidgets={widgets?.['homePageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar}
        position={'postPage'}
      />
    </div>
  );
};

export default homePage;
