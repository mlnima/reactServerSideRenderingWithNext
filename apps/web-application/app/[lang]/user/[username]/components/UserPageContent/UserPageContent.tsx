'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {UserPreviewImage} from "@repo/ui";
import UserPageActionButtons from "../UserPageActionButtons/UserPageActionButtons";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import './UserPageContent.styles.scss'
import {fetchUserPagePosts} from "@lib/fetch-requests/fetchPosts";
import {fetchUserPageInitialData} from "@lib/fetch-requests/fetchUsers";
import LoggedInRequirePageMessage from "@components/LoggedInRequireMessage/LoggedInRequirePageMessage";
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer";
import {Post} from "@repo/typescript-types";
import {loading} from "@store/reducers/globalStateReducer";
import ProfileImageWithEditing from "../PrfileImageWithEditing/ProfileImageWithEditing";


interface IProps {
    username: string,
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

interface IGetUserPostsData {
    override?: boolean,
    authorId: string,
    status: string,
    skip: number
}


const userPageContent: FC<IProps> = ({dictionary, username, locale}) => {

    const dispatch = useAppDispatch();
    const {userData, loggedIn} = useAppSelector(({user}) => user);
    const [isUserOwnProfile, setIsUserOwnProfile] = useState(false)
    const [noMorePostToFetch, setNMoMorePostToFetch] = useState<boolean>(false);
    const [postStatusToFetch, setPostStatusToFetch] = useState<string>('published');
    const [userPagePosts, setUserPagePosts] = useState<Post[] | []>([])
    const isFetchingRef = useRef(false); // add this line
    const {initialSettings} = useAppSelector(({settings}) => settings);


    const [userPageData, setUserPageData] = useState({
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        profileImage: '',
        didRequesterBlockThisUser: false,
        didThisUserBlockRequester: false,
        didRequesterFollowThisUser: false,
        isFollowed: false,
        username: '',
        about: '',
        _id: ''
    })

    useEffect(() => {
        if (loggedIn) {
            getUserPageData();
        }
    }, [loggedIn]);

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

    useEffect(() => {
        if (!!userData?._id && !!userPageData?._id) {
            setIsUserOwnProfile(userData?._id === userPageData?._id)
        }

        if (!!userPageData?._id) {
            getUserPostsData({
                override: true,
                status: postStatusToFetch,
                authorId: userPageData?._id,
                skip: 0
            })
        }
    }, [userPageData?._id, postStatusToFetch]);

    useEffect(() => {
        const handleScroll = async () => {
            if (isFetchingRef.current) return;
            const scrolled = window.scrollY;
            const viewportHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrolled + viewportHeight >= fullHeight - 20) {
                if (userPageData?._id) {
                    isFetchingRef.current = true;
                    if (!noMorePostToFetch) {
                        await getUserPostsData({
                            status: postStatusToFetch,
                            authorId: userPageData._id,
                            skip: userPagePosts.length
                        });
                        isFetchingRef.current = false;
                        window.scrollTo(0, scrolled - 20);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [userPageData?._id, userPagePosts?.length, noMorePostToFetch]);


    const getUserPageData = async () => {
        try {
            const responseData = await fetchUserPageInitialData({
                username,
                userWhoRequestIt: userData?._id as string
            })

            if (responseData._id) {
                await getUserPostsData({
                        status: postStatusToFetch || 'published',
                        authorId: userPageData?._id,
                        skip: userPagePosts.length
                    }
                )
            }
            setUserPageData(responseData)
        } catch (error) {

        }
    };

    const getUserPostsData = async ({
                                        authorId,
                                        skip = 0,
                                        status = 'published',
                                        override = false
                                    }: IGetUserPostsData) => {
        try {
            if (authorId) {
                dispatch(loading(true))
                const postData = await fetchUserPagePosts({
                    status,
                    authorId,
                    skip,
                    revalidate: 20
                }).finally(() => {
                    dispatch(loading(false))

                })

                if (
                    //@ts-ignore
                    postData?.posts?.length < (initialSettings?.contentSettings?.contentPerPage || 20) &&
                    !noMorePostToFetch
                ) {
                    setNMoMorePostToFetch(true)

                }

                if (postData?.posts?.length > 0) {
                    const newData = [...(postData?.posts || [])]
                    if (override) {
                        setUserPagePosts(newData)
                    } else {
                        setUserPagePosts((prevState) => ([
                            ...prevState,
                            ...newData
                        ]))
                    }
                } else {
                    setUserPagePosts([])
                }
            }

        } catch (error) {

        }
    }

    // useEffect(() => {
    //     console.log('userPagePosts=> ',userPagePosts)
    // }, [userPagePosts]);

    if (!loggedIn) return <LoggedInRequirePageMessage dictionary={dictionary}/>


    return (
        <div className={'userPageContent'}>


            <div className={'profileHeader'}>
                {isUserOwnProfile ? <ProfileImageWithEditing/> :
                    <UserPreviewImage imageUrl={userPageData?.profileImage} size={100}/>}

                <div className={'profileHeaderInfoActions'}>
                    <h1>@{userPageData?.username}</h1>

                    <UserPageActionButtons _id={userPageData?._id}
                                           isUserOwnProfile={isUserOwnProfile}
                                           didRequesterFollowThisUser={userPageData?.didRequesterFollowThisUser}
                                           username={userPageData?.username}
                                           profileImage={userPageData?.profileImage}
                                           setUserPageData={setUserPageData}
                                           dictionary={dictionary}/>
                    <div className={'followCount'}>
                        <p>
                            <span>{userPageData?.postsCount || 0} {dictionary?.['Posts'] || 'Posts'}</span>
                        </p>
                        <p>
                            <span>{userPageData?.followersCount || 0} {dictionary?.['Followers'] || 'Followers'}</span>
                        </p>
                        <p>
                            <span>{userPageData?.followingCount || 0} {dictionary?.['Followings'] || 'Followings'}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="profilePosts">
                {(isUserOwnProfile || userData.role === 'administrator') &&
                    <div className={'profilePostsNavigation'}>
                        {/*{postStatuses.filter(postStatus => postStatus !== 'trash' && postStatus !== 'draft').map(postStatus => {*/}
                        {/*    return (*/}
                        {/*        <button className={'btn btn-transparent'}*/}
                        {/*                onClick={() => setPostStatusToFetch(postStatus)}>*/}
                        {/*            {dictionary?.[capitalizeFirstLetter(postStatus)] || capitalizeFirstLetter(postStatus)}*/}
                        {/*        </button>*/}
                        {/*    )*/}
                        {/*})}*/}

                        <button className={'btn btn-transparent'}
                                onClick={() => setPostStatusToFetch('published')}>
                            {dictionary?.['Published'] || 'Published'}
                        </button>
                        <button className={'btn btn-transparent'}
                                onClick={() => setPostStatusToFetch('pending')}>
                            {dictionary?.['Pending'] || 'Pending'}
                        </button>
                        {userData.role === 'administrator' &&
                            <>
                            <button className={'btn btn-transparent'}
                                    onClick={() => setPostStatusToFetch('draft')}>
                                {dictionary?.['Draft'] || 'Draft'}
                            </button>
                            <button className={'btn btn-transparent'}
                                    onClick={() => setPostStatusToFetch('trash')}>
                                {dictionary?.['Trash'] || 'Trash'}
                            </button>
                            </>
                        }


                    </div>
                }

                {(userPagePosts?.length > 0) &&
                    <div className='postsContainer'>
                        <PostsCardsRenderer locale={locale}
                                            previewMode={true}
                                            dictionary={dictionary}
                                            posts={userPagePosts}/>
                    </div>
                }

                {userPagePosts?.length === 0 &&
                    <div className={'noPosts'}>
                        <div className={'profileNoPostsYet'}>
                            <FontAwesomeIcon icon={faCamera}/>
                        </div>
                        <h2 className="profile-no-posts-title">
                            {dictionary?.["Nothing Here"] || "Nothing Here"}
                        </h2>
                    </div>
                }

            </div>
        </div>
    )
};

export default userPageContent
