import dynamic from 'next/dynamic';
import { getDictionary } from '../../../../get-dictionary';
import './page.scss';

const UserPageContent = dynamic(
  () => import('./components/UserPageContent/UserPageContent'),
);
// import UserPageContent from './components/UserPageContent/UserPageContent';
import { getSettings } from '@lib/database/operations/settings';
import localDetector from '@lib/localDetector';
import { IPageProps } from '@repo/typescript-types';
import { getInitialUserPageData } from '@lib/database/operations/users';
import React from 'react';
import { getPosts } from '@lib/database/operations/posts';
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';

const userPage = async (props: IPageProps) => {
  const params = await props.params;
  const locale = localDetector(params.lang);
  const dictionary = await getDictionary(locale);
  const { userPageSettings } = await getSettings(['userPageSettings']);
  const { username } = params;

  const initialUserPageData = await getInitialUserPageData(username);

  if (!initialUserPageData) {
    return null;
  }

  const { posts } = await getPosts({
    locale,
    page: 1,
    status: 'published',
    author: initialUserPageData._id,
    count: 8,
    sort: 'views',
    returnTotalCount: false,
  });

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