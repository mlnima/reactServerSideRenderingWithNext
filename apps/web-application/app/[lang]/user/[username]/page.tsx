import dynamic from 'next/dynamic';
import { getDictionary } from '../../../../get-dictionary';
import './page.scss';

const UserPageContent = dynamic(
  () => import('./components/UserPageContent/UserPageContent'),
);
// import UserPageContent from './components/UserPageContent/UserPageContent';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import localDetector from '@lib/localDetector';
import { IPageProps, User } from '@repo/typescript-types';
import getInitialUserPageData from '@lib/actions/database/operations/users/getInitialUserPageData';
import React from 'react';
import getPosts from "@lib/actions/database/operations/posts/getPosts";
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import Soft404 from '@components/Soft404/Soft404';
import { ServerActionResponse } from '@lib/actions/response';

const userPage = async (props: IPageProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { userPageSettings } = await getSettings(['userPageSettings']);
  const { username } = params;

  // const initialUserPageData = await getInitialUserPageData(username);

  const initialUserPageDataResponse = await getInitialUserPageData(username) as ServerActionResponse<{
    initialUserPageData: User,
  }>;

  if (!initialUserPageDataResponse?.success || !initialUserPageDataResponse?.data) {
    return null;
  }

  const { initialUserPageData } = initialUserPageDataResponse?.data


  const { success, data } = await getPosts({
    locale,
    page: 1,
    status: 'published',
    author: initialUserPageData._id,
    count: 8,
    sort: 'views',
    returnTotalCount: false
  });


  if (!success || !data) {
    return <Soft404 dictionary={dictionary} />;
  }



  const { posts } = data

  return (
    <>
      {/*{initialUserPageData &&*/}
      {/*  <>*/}

      {/*  <UserPageContent*/}
      {/*    initialUserPageData={initialUserPageData}*/}
      {/*    dictionary={dictionary}*/}
      {/*    username={params.username}*/}
      {/*    locale={locale}*/}
      {/*  />*/}
      {/*</>*/}
      {/*}*/}

      {(posts && posts?.length > 0) ?
        <div className="postsContainer">
          <PostsCardsRenderer
            locale={locale}
            previewMode={true}
            dictionary={dictionary}
            posts={posts}
          />
        </div>
       : <div className={'noPosts'}>
        <div className={'profileNoPostsYet'}>
          <FontAwesomeIcon icon={faCamera} />
        </div>
        <h2 className="profile-no-posts-title">
          {dictionary?.['Nothing Here'] || 'Nothing Here'}
        </h2>
      </div>
      }


    </>
  );
};

export default userPage;

// <SidebarWidgetAreaRenderer
//   leftSideWidgets={widgets?.['userPageLeftSidebar']}
//   rightSideWidgets={widgets?.['userPageRightSidebar']}
//   dictionary={dictionary}
//   locale={locale}
//   sidebar={sidebar || 'no'}
//   position={'userPage'}
// />