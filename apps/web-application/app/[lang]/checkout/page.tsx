import MainWidgetArea from '@components/widgets/widgetAreas/MainWidgetArea';
import { getDictionary } from '../../../get-dictionary';
import './page.scss';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { IPageProps, IPageSettings } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getWidgets from '@lib/actions/database/widgets/getWidgets';
import getSettings from '@lib/actions/database/settings/getSettings';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';


const checkoutPage = async (props: IPageProps) => {

  const params = await props.params;
  // const {
  //   lang,
  // } = params;

  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);

  const { checkoutPageSettings } = unwrapResponse(
    await getSettings(['checkoutPageSettings']) as unknown as ServerActionResponse<{
      checkoutPageSettings: IPageSettings | undefined;
    }>,
  );


  const widgets = await getWidgets([
      'checkoutPageLeftSidebar',
      'checkoutPageRightSidebar',
      'checkoutPage',
    ],
    locale,
  );

  const sidebar = checkoutPageSettings?.sidebar;

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main checkoutPage'}>
        <MainWidgetArea dictionary={dictionary}
                        widgets={widgets?.checkoutPage}
                        locale={locale}
                        position={'checkoutPage'} />

      </main>

      <SidebarWidgetAreaRenderer leftSideWidgets={widgets?.['checkoutPageLeftSidebar']}
                                 rightSideWidgets={widgets?.['checkoutPageRightSidebar']}
                                 dictionary={dictionary}
                                 locale={locale}
                                 sidebar={sidebar || 'no'}
                                 position={'postPage'} />
    </div>
  );
};

export default checkoutPage;

