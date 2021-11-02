import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostPageStyledMain from "../PostPageStyle";
import {useSelector} from "react-redux";
import {settingsPropTypes, StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import {likeValueCalculator} from "../../../../_variables/_variables";
import * as Scroll from "react-scroll";
import PostTitle from "../components/PostTitle/PostTitle";

const PostMetaDataToSiteHead = dynamic(() => import('../components/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const EditLinkForAdmin = dynamic(() => import('../components/EditLinkForAdmin/EditLinkForAdmin'), {ssr: false})
const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))
const DownloadLink = dynamic(() => import('../components/DownloadLink/DownloadLink'))
const Price = dynamic(() => import('../components/Price/Price'))
const VideoPlayer = dynamic(() => import('../components/VideoPlayer/VideoPlayer'))
const PostDescription = dynamic(() => import('../components/PostDescription/PostDescription'))

const VideoTypePostPageStyledMain = styled(PostPageStyledMain)`
  a {
    color: var(--main-active-color);
  }
`
const VideoTypePostPage = () => {
    const postPageStyle = useSelector((store: StoreTypes) => store?.settings?.design.postPageStyle)
    const comments = useSelector((store: StoreTypes) => store?.posts?.comments)
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)
    const post = useSelector((store: settingsPropTypes) => store.posts.post);

    const [state, setState] = useState({
        likeValue: 0,
        mode: 'view',
        isLiked: false,
        isDisliked: false,
    });

    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
        likeDislikeView(post._id, 'views').then(res => {
            // @ts-ignore
            if (res.data.updatedData) {
                // @ts-ignore
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setState({
                ...state,
                likeValue: likeValueCalculator(post.likes, post.disLikes),
            });
        }
    }, [post.likes, post.disLikes]);


    return (
        <VideoTypePostPageStyledMain className='main post-page' postPageStyle={postPageStyle}>
            {userData?.role === 'administrator' ? <EditLinkForAdmin _id={post._id}/> : null}
            <PostMetaDataToSiteHead/>
            {post.postType === 'video' ? <VideoPlayer post={post}/> : null}
            <PostTitle title={post.title} translations={post.translations}/>
            <div className='rating-price-download'>
                <RatingButtons _id={post._id} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData} rating={true}/>
                {post.postType === 'product' ? <Price price={post.price} currency={post.currency}/> : null}
                <DownloadLink downloadLink={post.downloadLink} render={post.downloadLink}/>
            </div>
            <PostDescription description={post.description} translations={post.translations}/>
            <PostMeta type='actors' data={post.actors || []}/>
            <PostMeta type='tags' data={post.tags || []}/>
            <PostMeta type='categories' data={post.categories || []}/>
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <CommentFrom documentId={post._id} documentTitle={post.title}/>
            {comments?.length ? <CommentsRenderer/> : null}
        </VideoTypePostPageStyledMain>
    );
};
export default VideoTypePostPage;
