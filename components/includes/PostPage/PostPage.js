import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import PostPageStyledMain from './PostPageStyle'
import {useSelector} from "react-redux";
import ratingCalculator from "../../../_variables/util/ratingCalculator";
import RelatedPostsRenderer from "./components/RelatedPostsRenderer";

const WidgetsRenderer = dynamic(() => import('../WidgetsRenderer/WidgetsRenderer'))
// const SlideShow = dynamic(() => import('./components/SlideShow/SlideShow'))
const PostTitle = dynamic(() => import('./components/PostTitle/PostTitle'))
const PostDescription = dynamic(() => import('./components/PostDescription/PostDescription'))
const RatingButtons = dynamic(() => import('./components/RatingButtons/RatingButtons'))
const DownloadLink = dynamic(() => import('./components/DownloadLink/DownloadLink'))
const Price = dynamic(() => import('./components/Price/Price'))
const PostMeta = dynamic(() => import('./components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('./components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('./components/CommentFrom/CommentFrom'))


const PostPage = () => {


    const {post,postPageStyle} = useSelector(({settings,posts})=>{
        return{
            postPageStyle: settings?.design?.postPageStyle,
            post: posts.post
        }
    })


    const [state, setState] = useState({
        likeValue: 0,
        mode: 'view',
        isLiked: false,
        isDisliked: false,
    });

    // const [deviceWidth, setDeviceWidth] = useState(null);

    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({top: 0, behavior: 'smooth'})
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (post?.likes && post?.disLikes) {
                setState({
                    ...state,
                    likeValue: ratingCalculator(post?.likes, post?.disLikes),
                });
            }

        }
    }, [post?.likes, post?.disLikes]);

    return (
        <PostPageStyledMain id={'primary'} className='main post-page' postPageStyle={postPageStyle}>

            {/*{post?.postType === 'product' &&*/}
            {/*<SlideShow post={post} sidebar={identity?.data?.postPageSidebar} deviceWidth={deviceWidth}/>}*/}

            {(post?.postType === 'promotion' || post?.postType === 'article') &&
            <PostTitle title={post?.title} translations={post?.translations}/>}

            {(post?.mainThumbnail && post?.postType === 'promotion') &&
            <div className='promotion-thumbnail-link'>
                <a href={post?.redirectLink}><img className='main-thumbnail' src={post?.mainThumbnail} alt="title"/></a>
                <a href={post?.redirectLink} className='redirect-link' target='_blank'>go to {post?.title}</a>
            </div>
            }


            {(post?.postType === 'promotion' || post?.postType === 'article') &&
            <PostDescription description={post?.description} translations={post?.translations}/>}

            {(post?.postType !== 'promotion' && post?.postType !== 'article') &&
            <PostTitle title={post?.title} translations={post?.translations}/>}

            <div className='rating-price-download'>
                <RatingButtons _id={post?._id} ratingAndViewData={ratingAndViewData}
                               setRatingAndViewData={setRatingAndViewData} rating={true}/>
                {post?.postType === 'product' && <Price price={post?.price} currency={post?.currency}/>}
                <DownloadLink downloadLink={post?.downloadLink} render={post?.downloadLink}/>
            </div>

            {(post?.postType !== 'promotion' && post?.postType !== 'article') &&
              <PostDescription description={post?.description} translations={post?.translations}/>
            }

            <PostMeta type='tags' data={post?.tags || []}/>
            <PostMeta type='categories' data={post?.categories || []}/>
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <RelatedPostsRenderer/>
            <CommentFrom documentId={post?._id}/>
            {!!post?.comments?.length && <CommentsRenderer/>}


        </PostPageStyledMain>
    );
};
export default PostPage;
