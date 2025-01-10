/* eslint-disable */
'use client';
import LoggedInRequirePageMessage from '@components/LoggedInRequireMessage/LoggedInRequirePageMessage';
import PostsCardsRenderer from '@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getPosts } from '@lib/database/operations/posts';
import { getLoadedUserPageData, getUserInitialPageData } from '@lib/database/operations/users';
import { uniqArrayBy } from '@repo/shared-util';
import { IUserPageData, Post } from '@repo/typescript-types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loading } from '@store/reducers/globalStateReducer';
import { FC, useEffect, useRef, useState } from 'react';
import AuthorPostsNavigation from './AuthorPostsNavigation';
import ProfileHeader from './ProfileHeader';
import './UserPageContent.scss';

interface IProps {
  locale: string;
  initialUserPageData: {
    _id: string,
    username: string,
    role: string,
    followingCount?: number,
    followersCount?: number,
    postsCount?: number,
    profileImage?: {
      _id: string,
      filePath: string,
    },
    createdAt: string,
    status?: string,
    isVerified?: boolean,
  };
  dictionary: {
    [key: string]: string;
  };
}

interface IGetUserPostsData {
  override?: boolean;
  authorId: string;
  status: string;
  skip: number;
}

const UserPageContent: FC<IProps> = ({ dictionary, locale, initialUserPageData }) => {
  const dispatch = useAppDispatch();
  const { userData, loggedIn } = useAppSelector(({ user }) => user);
  const [isUserOwnProfile, setIsUserOwnProfile] = useState(false);
  const [noMorePostToFetch, setNMoMorePostToFetch] = useState<boolean>(false);
  const [postStatusToFetch, setPostStatusToFetch] =
    useState<string>('published');
  const [userPagePosts, setUserPagePosts] = useState<Post[] | []>([]);
  const isFetchingRef = useRef(false);
  const { initialSettings } = useAppSelector(({ settings }) => settings);

  const [userPageData, setUserPageData] = useState<IUserPageData | {}>({});

  useEffect(() => {
    setUserPageData(initialUserPageData)
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getUserPageData()
    }
  }, [loggedIn]);

  const getUserPageData = async ()  => {
    try {
      const responseData = await getLoadedUserPageData({
        _id:initialUserPageData._id,
        userWhoRequestIt: userData?._id as string,
      });
      // if (responseData._id) {
      //   await getUserPostsData({
      //     status: postStatusToFetch || 'published',
      //     authorId: userPageData?._id,
      //     skip: userPagePosts.length,
      //   });
      // }
      setUserPageData({
        ...userPageData,
        ...responseData
      });
      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (loggedIn)
      console.log(`userData?._id === initialUserPageData._id)=> `,userData?._id === initialUserPageData._id)
      setIsUserOwnProfile(userData?._id === initialUserPageData._id);



  }, [initialUserPageData._id,loggedIn, postStatusToFetch]);
  // if (initialUserPageData?._id) {
  //   getUserPostsData({
  //     override: true,
  //     status: postStatusToFetch,
  //     authorId: userPageData?._id,
  //     skip: 0,
  //   });
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

  const getUserPostsData = async ({
                                    authorId,
                                    skip = 0,
                                    status = 'published',
                                    override = false,
                                  }: IGetUserPostsData) => {
    try {
      if (authorId) {
        dispatch(loading(true));

        const { posts, totalCount } = await getPosts({
          locale,
          page: 1,
          status,
          author: authorId,
        }).finally(() => {
          dispatch(loading(false));
        });

        if (
          posts?.length <
          (initialSettings?.contentSettings?.contentPerPage || 20) &&
          !noMorePostToFetch
        ) {
          setNMoMorePostToFetch(true);
        }

        if (posts?.length > 0) {
          const newData = [...(posts || [])];
          if (override) {
            setUserPagePosts(newData);
          } else {
            const newSetOfPost = setUserPagePosts((prevState) =>
              uniqArrayBy([...prevState, ...newData], '_id'),
            );
          }
        } else {
          setUserPagePosts([]);
        }
      }
    } catch {
      return null;
    }
  };

  // useEffect(() => {
  //     console.log('userPagePosts=> ',userPagePosts)
  // }, [userPagePosts]);

  if (!loggedIn) return <LoggedInRequirePageMessage dictionary={dictionary} />;

  return (
    <div className={'userPageContent'}>
      <ProfileHeader
        userPageData={userPageData}
        setUserPageData={setUserPageData}
        isUserOwnProfile={isUserOwnProfile}
        dictionary={dictionary}
      />

      <div className="profilePosts">
        {(isUserOwnProfile || userData.role === 'administrator') && (
          <AuthorPostsNavigation
            setPostStatusToFetch={setPostStatusToFetch}
            dictionary={dictionary}
            userRole={userData?.role}
          />
        )}

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

        {/*{userPagePosts?.length === 0 && (*/}
        {/*  <div className={'noPosts'}>*/}
        {/*    <div className={'profileNoPostsYet'}>*/}
        {/*      <FontAwesomeIcon icon={faCamera} />*/}
        {/*    </div>*/}
        {/*    <h2 className="profile-no-posts-title">*/}
        {/*      {dictionary?.['Nothing Here'] || 'Nothing Here'}*/}
        {/*    </h2>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
};

export default UserPageContent;

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