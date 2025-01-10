import SidebarWidgetAreaRenderer from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import dynamic from 'next/dynamic';
import { getDictionary } from '../../../../get-dictionary';
import './page.styles.scss';

const UserPageContent = dynamic(
  () => import('./components/UserPageContent/UserPageContent')
);
// import UserPageContent from './components/UserPageContent/UserPageContent';
import { getSettings } from '@lib/database/operations/settings';
import { getWidgets } from '@lib/database/operations/widgets';
import localDetector from '@lib/localDetector';
import { IPageProps } from '@repo/typescript-types';
import { getInitialUserPageData } from '@lib/database/operations/users';

const userPage = async (props: IPageProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { userPageSettings } = await getSettings(['userPageSettings']);
  const sidebar = userPageSettings?.sidebar;
  const { username } = params;

  const initialUserPageData = await getInitialUserPageData(username)

  const widgets = await getWidgets(
    [
      'userPageTop',
      'userPageLeftSidebar',
      'userPageBottom',
      'userPageRightSidebar',
    ],
    locale
  );

  return (
    <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main userPage'}>
        {initialUserPageData && (
          <UserPageContent
            initialUserPageData={initialUserPageData}
            dictionary={dictionary}
            username={params.username}
            locale={locale}
          />
        )}
      </main>
      <SidebarWidgetAreaRenderer
        leftSideWidgets={widgets?.['userPageLeftSidebar']}
        rightSideWidgets={widgets?.['userPageRightSidebar']}
        dictionary={dictionary}
        locale={locale}
        sidebar={sidebar || 'no'}
        position={'userPage'}
      />
    </div>
  );
};

export default userPage;
