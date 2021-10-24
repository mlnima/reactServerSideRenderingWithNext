import React, {useEffect, useMemo} from 'react';
import {useRouter} from "next/router";
import * as Scroll from "react-scroll";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import Posts from "../Posts/Posts";
import styled from "styled-components";
import {useSelector} from "react-redux";


let PostsContainer = styled.div`
  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }
`


const PostsPage = () => {
    // @ts-ignore
    const posts = useSelector(state => state.posts.posts)
    const totalCount = useSelector(state => state.posts.totalCount)
    const postsToRender = useMemo(()=>{
        return posts
    },posts)
    const router = useRouter()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
    }, [router.query]);

    return (
        <React.Fragment>

            <PaginationComponent
                isActive={true}
                currentPage={router.query.page || 1}
                totalCount={totalCount}
                size={ process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30}
                maxPage={Math.ceil(totalCount / parseInt( process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30))}
            />
            <PostsContainer className='posts-container'>
                <Posts
                    posts={postsToRender}
                />
            </PostsContainer>
            <PaginationComponent
                isActive={true}
                currentPage={router.query.page || 1}
                totalCount={totalCount}
                size={process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30}
                maxPage={Math.ceil(totalCount / parseInt( process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30))}
            />
        </React.Fragment>
    );
};
export default PostsPage;
