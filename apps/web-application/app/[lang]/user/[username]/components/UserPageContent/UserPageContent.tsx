'use client';
import React, {FC, useEffect, useRef, useState} from "react";
import {UserPreviewImage} from "ui";
import UserPageActionButtons from "../UserPageActionButtons/UserPageActionButtons";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import './UserPageContent.styles.scss'
import {fetchUserPageInitialData, fetchUserPagePosts} from "fetch-requests";
import LoggedInRequirePageMessage from "@components/LoggedInRequireMessage/LoggedInRequirePageMessage";
import PostsCardsRenderer from "@components/cards/CardsRenderer/PostsCardsRenderer/PostsCardsRenderer";
import {Post} from "typescript-types";
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
    authorId: string,
    skip: number
}


const userPageContent: FC<IProps> = ({dictionary, username, locale}) => {

    const dispatch = useAppDispatch();
    const {userData, loggedIn} = useAppSelector(({user}) => user);
    const [isUserOwnProfile, setIsUserOwnProfile] = useState(false)
    const [userPagePosts, setUserPagePosts] = useState<Post[] | []>([])
    const isFetchingRef = useRef(false); // add this line

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

    useEffect(() => {
        setIsUserOwnProfile(userData?._id === userPageData?._id)
        if (!!userPageData?._id) {
            getUserPostsData({
                authorId: userPageData?._id,
                skip: userPagePosts?.length
            })
        }
    }, [userPageData?._id]);

    useEffect(() => {
        const handleScroll = async () => {
            if (isFetchingRef.current) return;
            const scrolled = window.scrollY;
            const viewportHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrolled + viewportHeight >= fullHeight - 20) {
                if (userPageData?._id) {
                    isFetchingRef.current = true;
                    await getUserPostsData({
                        authorId: userPageData._id,
                        skip: userPagePosts.length
                    });
                    isFetchingRef.current = false;
                    window.scrollTo(0, scrolled - 50);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [userPageData?._id, userPagePosts?.length]);

    const getUserPageData = async () => {
        try {
            const responseData = await fetchUserPageInitialData({
                username,
                userWhoRequestIt: userData?._id as string
            })

            if (responseData._id) {
                await getUserPostsData({
                        authorId: userPageData?._id,
                        skip: userPagePosts.length
                    }
                )
            }

            setUserPageData(responseData)
        } catch (error) {

        }
    };

    const getUserPostsData = async ({authorId, skip}: IGetUserPostsData) => {

        try {
            if (authorId) {
                dispatch(loading(true))
                const postData = await fetchUserPagePosts({
                    authorId,
                    skip
                }).finally(() => {
                    dispatch(loading(false))

                })

                if (postData?.posts?.length > 0) {
                    setUserPagePosts((prevState) => ([
                        ...prevState,
                        ...(postData?.posts || [])
                    ]))
                }
            }

        } catch (error) {

        }
    }


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
                            <span>{userPageData?.followingCount || 0} {dictionary?.['Following'] || 'Following'}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="profile-posts">
                {userPagePosts?.length > 0 ?
                    <div className='postsContainer'>
                        <PostsCardsRenderer locale={locale} posts={userPagePosts}/>
                    </div> :
                    <>
                        <div className={'profileNoPostsYet'}>
                            <FontAwesomeIcon icon={faCamera}/>
                        </div>
                        <h2 className="profile-no-posts-title">No Post Yet</h2>

                    </>
                }

            </div>
        </div>
    )
};

export default userPageContent
