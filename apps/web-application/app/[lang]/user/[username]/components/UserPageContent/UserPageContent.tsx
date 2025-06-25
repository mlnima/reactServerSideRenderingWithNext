/* eslint-disable */
'use client';
import LoggedInRequirePageMessage from '@components/LoggedInRequireMessage/LoggedInRequirePageMessage';
import getPosts from "@lib/actions/database/posts/getPosts";
import getLoadedUserPageData from '@lib/actions/database/users/getLoadedUserPageData';
import { IUserPageData, IPost } from '@repo/typescript-types';
import { useAppSelector } from '@store/hooks';
import { FC, useEffect,  useState } from 'react';
import './UserPageContent.scss';
import { useSearchParams } from 'next/navigation';
import Soft404 from '@components/Soft404/Soft404';


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
  const [userPagePosts, setUserPagePosts] = useState<IPost[] | []>([]);
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

  // useEffect(() => {
  //   console.log(`userPageData=> `,userPageData);
  //   // console.log(`console=> `);
  // }, [userPageData]);

  const getUserPageData = async () => {
    try {
      if (!initialUserPageData._id) return;

      const {success, data} = await getLoadedUserPageData({
        userId: initialUserPageData._id,
        userWhoRequestIt: userData?._id as string,
      });

      if (!success || !data || !data.loadedUserPageData){
        return
      }

      setUserPageData((prevState)=>({
        ...prevState,
        ...data.loadedUserPageData
      }));

    } catch {
      return null;
    }
  };

  const getUserPosts = async () => {
    const currentPageQuery = searchParams.get('page');
    const currentPage = currentPageQuery ? parseInt(currentPageQuery, 10) : 1;


    const { success, data } = await getPosts({
      locale,
      page: currentPage,
      status: postStatusToFetch || 'published',
      author: initialUserPageData._id,
    });


    if (!success || !data) {
      return <Soft404 dictionary={dictionary} />;
    }

    const { posts, totalCount } = data

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