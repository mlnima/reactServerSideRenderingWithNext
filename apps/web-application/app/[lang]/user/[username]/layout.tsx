import getInitialUserPageData from '@lib/actions/database/operations/users/getInitialUserPageData';
import localDetector from '@lib/localDetector';
import { getDictionary } from '../../../../get-dictionary';
import { ILayoutProps, User } from '@repo/typescript-types';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import getWidgets from '@lib/actions/database/operations/widgets/getWidgets';
import Soft404 from '@components/Soft404/Soft404';
import React from 'react';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import ProfileHeader from './components/ProfileHeader';
import './layout.scss';
import AuthorPostsNavigation from './posts/components/AuthorPostsNavigation';
import { ServerActionResponse } from '@lib/actions/response';

const UserLayout = async (props: ILayoutProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { userPageSettings } = await getSettings(['userPageSettings']);
  const sidebar = userPageSettings?.sidebar;
  const { username } = params;

  const { success, data } = await getInitialUserPageData(username) as ServerActionResponse<{
    initialUserPageData: User,
  }>;

  if (!success || !data) {
    return <Soft404 dictionary={dictionary} />;
  }

  const { initialUserPageData } = data

  const widgets = await getWidgets(
    [
      'userPageTop',
      'userPageLeftSidebar',
      'userPageBottom',
      'userPageRightSidebar',
    ],
    locale,
  );

  return (
    <div id={'content'} className={`userLayout page-${sidebar || 'no'}-sidebar`}>
      <main id={'primary'} className={'main userPage'}>
        {/*<Suspense fallback={<p>Loading feed...</p>}>*/}
        <ProfileHeader
          initialUserPageData={initialUserPageData}
          dictionary={dictionary}
        />

        <AuthorPostsNavigation initialUserPageData={initialUserPageData} dictionary={dictionary}/>
        {/*</Suspense>*/}
        {props.children}
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


export default UserLayout;