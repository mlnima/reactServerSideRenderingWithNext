/* eslint-disable */
'use client';
import LoggedInRequirePageMessage from '@components/LoggedInRequireMessage/LoggedInRequirePageMessage';
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPosts } from '@lib/database/operations/posts';
import { getLoadedUserPageData } from '@lib/database/operations/users';
import { uniqArrayBy } from '@repo/utils';
import { IUserPageData, Post } from '@repo/typescript-types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loading } from '@store/reducers/globalStateReducer';
import { FC, useEffect, useRef, useState } from 'react';
//import AuthorPostsNavigation from '../../posts/[postType]/components/AuthorPostsNavigation';
import ProfileHeader from '../ProfileHeader';
import './UserPageContent.scss';
import { useSearchParams } from 'next/navigation';

interface IProps {
  locale: string;

  initialUserPageData: IUserPageData;
  dictionary: {
    [key: string]: string;
  };
}

const UserPageContent: FC<IProps> = ({ dictionary, locale, initialUserPageData }) => {
  const { userData, loggedIn } = useAppSelector(({ user }) => user);
  const [isUserOwnProfile, setIsUserOwnProfile] = useState(false);
  const [postStatusToFetch, setPostStatusToFetch] =
    useState<string>('published');
  const [userPagePosts, setUserPagePosts] = useState<Post[] | []>([]);
  const searchParams = useSearchParams();

  const [userPageData, setUserPageData] = useState<IUserPageData | null>(null);

  useEffect(() => {
    setUserPageData({
      ...userPageData,
      ...initialUserPageData,
    });
  }, [initialUserPageData]);

  useEffect(() => {
    if (loggedIn) {
      getUserPageData();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setIsUserOwnProfile(userData?._id === initialUserPageData._id);
    }
  }, [initialUserPageData._id, loggedIn, postStatusToFetch]);

  // useEffect(() => {
  //   if (
  //     loggedIn &&
  //     initialUserPageData.postsCount &&
  //     initialUserPageData.postsCount > userPagePosts.length
  //   ){
  //     getUserPosts();
  //   }
  // }, [searchParams,loggedIn]);

  const getUserPageData = async () => {
    try {
      if (!initialUserPageData._id) return;

      const responseData = await getLoadedUserPageData({
        userId: initialUserPageData._id,
        userWhoRequestIt: userData?._id as string,
      });

      setUserPageData({
        ...userPageData,
        ...responseData,
      });

      return null;
    } catch {
      return null;
    }
  };

  const getUserPosts = async () => {
    const currentPageQuery = searchParams.get('page');
    const currentPage =
      currentPageQuery && typeof currentPageQuery === 'string'
        ? parseInt(currentPageQuery, 10)
        : 1;

    const { posts, totalCount } = await getPosts({
      locale,
      page: currentPage,
      status: postStatusToFetch || 'published',
      author: initialUserPageData._id,
    });
    if (posts) {
      setUserPagePosts(posts);
    }
  };


  if (!loggedIn) return <LoggedInRequirePageMessage dictionary={dictionary} />;

  return (
    <div className={'userPageContent'}>
      <div className="profileContent">
        {/*{(isUserOwnProfile || userData.role === 'administrator') && (*/}
        {/*  <AuthorPostsNavigation*/}
        {/*    setPostStatusToFetch={setPostStatusToFetch}*/}
        {/*    dictionary={dictionary}*/}
        {/*    userRole={userData?.role}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default UserPageContent;
// <ProfileHeader
//   userPageData={userPageData}
//   setUserPageData={setUserPageData}
//   dictionary={dictionary}
//   getUserPageData={getUserPageData}
// />
{/*{userPagePosts?.length > 0 && (*/}
{/*  <div className="postsContainer">*/}
{/*    <PostsCardsRenderer*/}
{/*      locale={locale}*/}
{/*      previewMode={true}*/}
{/*      dictionary={dictionary}*/}
{/*      posts={userPagePosts}*/}
{/*    />*/}
{/*  </div>*/}
{/*)}*/}
// const getUserPostsData = async (
//   {
//     authorId,
//     page = 1,
//     status = 'published',
//   }: IGetUserPostsData) => {
//   try {
//     if (authorId) {
//       const { posts, totalCount } = await getPosts({
//         locale,
//         page: searchParams.get('page') || 1,
//         status,
//         author: authorId,
//       });
//
//       setUserPagePosts(posts);
//
//     }
//   } catch {
//     return null;
//   }
// };

// if (initialUserPageData?._id) {

// }


// useEffect(() => {
//   const handleScroll = async () => {
//     if (isFetchingRef.current) return;
//     const scrolled = window.scrollY;
//     const viewportHeight = window.innerHeight;
//     const fullHeight = document.documentElement.scrollHeight;
//
//     if (scrolled + viewportHeight >= fullHeight - 20) {
//       if (userPageData?._id) {
//         isFetchingRef.current = true;
//         if (!noMorePostToFetch) {
//           await getUserPostsData({
//             status: postStatusToFetch,
//             authorId: userPageData._id,
//             skip: userPagePosts.length,
//           });
//           isFetchingRef.current = false;
//           window.scrollTo(0, scrolled - 20);
//         }
//       }
//     }
//   };
//
//   window.addEventListener('scroll', handleScroll);
//
//   return () => {
//     window.removeEventListener('scroll', handleScroll);
//   };
// }, [userPageData?._id, userPagePosts?.length, noMorePostToFetch]);


// useEffect(() => {
//     console.log('userPagePosts=> ',userPagePosts)
// }, [userPagePosts]);

// if (
//   posts?.length <
//   (initialSettings?.contentSettings?.contentPerPage || 20) &&
//   !noMorePostToFetch
// ) {
//   setNMoMorePostToFetch(true);
// }

// if (posts?.length > 0) {
//   if (override) {
//     setUserPagePosts(posts);
//   } else {
//     // @ts-expect-error: its fine
//     setUserPagePosts((prevState) => uniqArrayBy([...prevState, ...posts], '_id'));
//   }
// } else {
//   setUserPagePosts([]);
// }

// {/*{postStatuses.filter(postStatus => postStatus !== 'trash' && postStatus !== 'draft').map(postStatus => {*/}
//     {/*    return (*/}
//     {/*        <button className={'btn btn-transparent'}*/}
//     {/*                onClick={() => setPostStatusToFetch(postStatus)}>*/}
//     {/*            {dictionary?.[capitalizeFirstLetter(postStatus)] || capitalizeFirstLetter(postStatus)}*/}
//     {/*        </button>*/}
//     {/*    )*/}
//     {/*})}*/}

// const postData = await fetchUserPagePosts({
//     status,
//     authorId,
//     skip,
//     revalidate: 20,
// }).finally(() => {
//     dispatch(loading(false));
// });

// useEffect(() => {
//
//     if (userPageData?._id) {
//         console.log('postStatusToFetch=> ', postStatusToFetch)
//         // await getUserPostsData({
//         //         status: postStatusToFetch || 'published',
//         //         authorId: userPageData?._id,
//         //         skip: userPagePosts.length
//         //     }
//         // )
//     }
//
//
// }, [postStatusToFetch, userPageData?._id]);

// followersCount: 0,
// followingCount: 0,
// postsCount: 0,
// profileImage: '',
// didRequesterBlockThisUser: false,
// didThisUserBlockRequester: false,
// didRequesterFollowThisUser: false,
// isFollowed: false,
// username: '',
// about: '',
// _id: '',

// initialUserPageData: {
//   _id: string,
//   username: string,
//   role: string,
//   followingCount?: number,
//   followersCount?: number,
//   postsCount?: number,
//   profileImage?: {
//     _id: string,
//     filePath: string,
//   },
//   createdAt: string,
//   status?: string,
//   isVerified?: boolean,
// };