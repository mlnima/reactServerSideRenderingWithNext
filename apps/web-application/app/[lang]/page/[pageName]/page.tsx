import MainWidgetArea from '@components/widgets/widgetAreas/MainWidgetArea';
import { getDictionary } from '../../../../get-dictionary';
import pageMetaGenerator from './components/pageMetaGenerator/pageMetaGenerator';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import { IPageProps } from '@repo/typescript-types';
import localDetector from '@lib/localDetector';
import getPage from '@lib/actions/database/operations/pages/getPage';
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import Soft404 from '@components/Soft404/Soft404';
import React from 'react';


const page = async (props: IPageProps) => {
  const params = await props.params;
  const { lang, pageName } = params;
  const locale = localDetector(lang);
  const dictionary = await getDictionary(locale);

  if (!pageName) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { success, data } = await getPage({ pageName });

  if (!success || !data) {
    return <Soft404 dictionary={dictionary} />;
  }

  const widgets = pageName ? await getWidgets([
      `${pageName}LeftSidebar`,
      `${pageName}RightSidebar`,
      pageName,
    ],
    locale,
  ) : {};

  const sidebar = data?.pageData?.sidebar;

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main page'}>
        <MainWidgetArea dictionary={dictionary}
                        widgets={pageName ? widgets?.[pageName] : []}
                        locale={locale}
                        position={'home'} />
      </main>
      <SidebarWidgetAreaRenderer leftSideWidgets={widgets?.[`${pageName}LeftSidebar`]}
                                 rightSideWidgets={widgets?.[`${pageName}RightSidebar`]}
                                 dictionary={dictionary}
                                 locale={locale}
                                 sidebar={sidebar || 'no'}
                                 position={'postPage'} />
    </div>
  );
};

export default page;

export const generateMetadata = pageMetaGenerator;
