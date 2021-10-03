import React, {useEffect, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {useRouter} from "next/router";
import * as Scroll from "react-scroll";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import Posts from "../Posts/Posts";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from '../../../_variables/TypeScriptTypes/GlobalTypes'

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


const PostsPage = props => {
    // @ts-ignore
    const posts = useSelector(state => state.posts.posts)
    const totalCount = useSelector(state => state.posts.totalCount)

    const contextData = useContext(AppContext);
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
                size={props.countPerPage || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30}
                maxPage={Math.ceil(parseInt(totalCount) / parseInt(props.countPerPage || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30))}
            />
            <PostsContainer className='posts-container'>
                <Posts
                    posts={posts}
                    postElementSize={props.postElementSize || props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader || contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader}
                />
            </PostsContainer>
            <PaginationComponent
                isActive={true}
                currentPage={router.query.page || 1}
                totalCount={totalCount}
                size={props.countPerPage ||process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30}
                maxPage={Math.ceil(parseInt(totalCount) / parseInt(props.countPerPage ||process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 30))}
            />
        </React.Fragment>
    );
};
export default PostsPage;
