import React, {useEffect, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {useRouter} from "next/router";
import * as Scroll from "react-scroll";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import Posts from "../Posts/Posts";

const PostsPage = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
    }, [router.query]);

    return (
        <React.Fragment>
            <style jsx>{`
              .posts-page-info {
                margin: 5px 0;

                h1 {
                  margin: 0;
                  padding: 0 10px;
                }
              }

              .posts-container {
                width: 100%;
              }
            `}</style>
            <PaginationComponent
                isActive={true}
                currentPage={props.getPostsData.page}
                totalCount={props.postsSource.totalCount}
                size={props.getPostsData.size}
                maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
            />
            <div className='posts-container'>
                <Posts
                    posts={props.postsSource.posts || []}
                    postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                    postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                    postElementImageLoader={props.design?.data?.postElementImageLoader || contextData.siteDesign.postElementImageLoader}
                    postElementImageLoaderType={props.design?.data?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader}
                />
            </div>
            <PaginationComponent
                isActive={true}
                currentPage={props.getPostsData.page}
                totalCount={props.postsSource.totalCount}
                size={props.getPostsData.size}
                maxPage={Math.ceil(parseInt(props.postsSource.totalCount) / parseInt(props.getPostsData.size))}
            />
        </React.Fragment>
    );
};
export default PostsPage;