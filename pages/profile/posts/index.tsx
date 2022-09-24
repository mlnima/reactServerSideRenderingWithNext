import React, {FC, useEffect} from 'react';
import ProfileNavigation from '@components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation'
import Link from "next/link";
import ProfileImage from "@components/includes/profilePageComponents/ProfileImage/ProfileImage";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

const PostsStyledDiv = styled.div`
  max-width: 940px;
  margin: auto;

  .create-new-post-link {
    color: var(--main-text-color);
    border: solid .4px var(--main-text-color);
    padding: 5px 10px;
  }
`
const Posts = () => {
    const userData = useSelector((store: Store) => store?.user.userData)
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
            <ProfileImage/>
            <ProfileNavigation/>
            <Link href={'/profile.json/posts/newpost'}>
                <a className='create-new-post-link'>create new post</a>
            </Link>
            {/*<PostsRenderer posts={ state.posts || [] }/>*/}
            {/*posts*/}
        </PostsStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

        // @ts-ignore
        await _getServerSideStaticPageData(
            context,
            [
                'profilePageRightSidebar',
                'profilePageLeftSidebar',
                'profilePage'
            ])

    return null
    })


Posts.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}
export default Posts;
