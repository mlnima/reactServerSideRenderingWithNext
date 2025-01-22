import { getInitialUserPageData } from '@lib/database/operations/users';
import localDetector from '@lib/localDetector';
import { getDictionary } from '../../../../get-dictionary';
import { ILayoutProps } from '@repo/typescript-types';
import { getSettings } from '@lib/database/operations/settings';
import { getWidgets } from '@lib/database/operations/widgets';
import Soft404 from '@components/Soft404/Soft404';
import React from 'react';
import SidebarWidgetAreaRenderer
  from '@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer';
import ProfileHeader from './components/ProfileHeader';
import './layout.scss';
import AuthorPostsNavigation from './posts/components/AuthorPostsNavigation';
import { Suspense } from 'react';

const UserLayout = async (props: ILayoutProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { userPageSettings } = await getSettings(['userPageSettings']);
  const sidebar = userPageSettings?.sidebar;
  const { username } = params;
  const initialUserPageData = await getInitialUserPageData(username);

  if (!initialUserPageData) {
    return <Soft404 dictionary={dictionary} />;
  }

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

          <AuthorPostsNavigation initialUserPageData={initialUserPageData} />
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