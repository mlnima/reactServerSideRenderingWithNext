import React, {FC, useEffect} from 'react';
import ProfileNavigation from '../../../components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation'
import Link from "next/link";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import _getServerSideStaticPageData from "../../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import ProfileImage from "@components/pagesIncludes/profile/ProfileImage/ProfileImage";
import {useAppSelector} from "@store_toolkit/hooks";

const PostsStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;

  .create-new-post-link {
    color: var(--primary-text-color,#fff);
    border: solid .4px var(--primary-text-color,#fff);
    padding: 5px 10px;
  }
`
const Posts = () => {
    const userData = useAppSelector((store) => store?.user.userData)
    // const router = useRouter();
    //
    // const [state, setState] = useState({
    //     posts: [],
    //     totalCount: 0
    // });

    useEffect(() => {
        if (userData?.username && userData?._id && userData?.username !== 'guest') {
            // const getPostsData = {
            //     size: parseInt(router.query.size) || 30,
            //     pageNo: parseInt(router.query.page) || 1,
            //     postType: router.query.type || 'all',
            //     fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price'],
            //     keyword: router.query.keyword || '',
            //     author: userData._id,
            //     actor: router.query.actor || 'all',
            //     status: router.query.status || 'published',
            //     tag: router.query.tag || 'all',
            //     category: router.query.category || 'all',
            //     sort: router.query.sort || 'latest',
            // }
            // getPosts(getPostsData, window.location.origin, true, window.location.href).then(res => {
            //     setState({
            //         ...state,
            //         posts: res?.data?.posts,
            //         totalCount: res?.data?.totalCount
            //     })
            // })
        }
    }, []);

    return (
        <PostsStyledDiv className='my-profile-posts main'>
            <HeadSetter title={'Profile Posts'}/>
            <ProfileImage/>
            <ProfileNavigation/>
            <Link href={'/profile.json/posts/newpost'} className='create-new-post-link'>
                create new post
            </Link>
            {/*<PostsRenderer posts={ state.posts || [] }/>*/}
            {/*posts*/}
        </PostsStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ],
        {
            setHeadData: true,
            page: 'ProfilePostsPage'
        }, store)

    return {
        props: {}
    }
})


export default Posts;
