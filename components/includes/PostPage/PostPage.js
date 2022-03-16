import React, {useEffect, useState} from 'react';
import * as Scroll from "react-scroll";
import dynamic from "next/dynamic";
import PostPageStyledMain from './PostPageStyle'
import {useSelector} from "react-redux";
import ratingCalculator from "../../../_variables/util/ratingCalculator";
const WidgetsRenderer = dynamic(() => import('../WidgetsRenderer/WidgetsRenderer'))
const EditLinkForAdmin = dynamic(() => import('./components/EditLinkForAdmin/EditLinkForAdmin'),{ssr:false})
const PostMetaDataToSiteHead = dynamic(() => import('./components/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const VideoPlayer = dynamic(() => import('./components/VideoPlayer/VideoPlayer'))
const SlideShow = dynamic(() => import('./components/SlideShow/SlideShow'))
const PostTitle = dynamic(() => import('./components/PostTitle/PostTitle'))
const PostDescription = dynamic(() => import('./components/PostDescription/PostDescription'))
const RatingButtons = dynamic(() => import('./components/RatingButtons/RatingButtons'))
const DownloadLink = dynamic(() => import('./components/DownloadLink/DownloadLink'))
const Price = dynamic(() => import('./components/Price/Price'))
const PostMeta = dynamic(() => import('./components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('./components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('./components/CommentFrom/CommentFrom'))


const PostPage = ( ) => {
    const postPageStyle = useSelector(store => store?.settings.design.postPageStyle)
    const userData = useSelector((store) => store?.user?.userData)
    const identity = useSelector((store) => store?.settings.identity);
    const comments = useSelector(store => store?.posts?.comments)
    const post = useSelector((store ) => store?.posts.post);
    // const settings = useSelector((store) => store?.settings);
    // const router = useRouter()

    const [state, setState] = useState({
        likeValue: 0,
        mode: 'view',
        isLiked: false,
        isDisliked: false,
    });

    const [deviceWidth, setDeviceWidth] = useState(null);

    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
        if (typeof window !== 'undefined') {
            setDeviceWidth(window.innerWidth)
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (post.likes, post.disLikes){
                setState({
                    ...state,
                    likeValue: ratingCalculator(post.likes, post.disLikes),
                });
            }

        }
    }, [post?.likes, post?.disLikes]);

    return (
        <PostPageStyledMain className='main post-page' postPageStyle={postPageStyle}>

            {userData?.role === 'administrator' ? <EditLinkForAdmin _id={post._id} status={post.status}/> :null}

            <PostMetaDataToSiteHead/>

            {post.postType === 'video' ? <VideoPlayer post={post}/> : null}

            {post.postType === 'product' ? <SlideShow post={post} sidebar={identity?.data?.postPageSidebar} deviceWidth={deviceWidth}/> : null}

            {post.postType === 'promotion' || post.postType === 'article' ? <PostTitle title={post.title} translations={post.translations}/> : null}

            {
                post.mainThumbnail && post.postType === 'promotion' ?
                    <div className='promotion-thumbnail-link'>
                        <a href={post.redirectLink}><img className='main-thumbnail' src={post.mainThumbnail} alt="title"/></a>
                        <a href={post.redirectLink} className='redirect-link' target='_blank'>go to {post.title}</a>
                    </div>
                    : null
            }


            {post.postType === 'promotion' || post.postType === 'article' ? <PostDescription description={post.description} translations={post.translations}/> : null}

            {post.postType !== 'promotion' && post.postType !== 'article' ? <PostTitle title={post.title} translations={post.translations}/> : null}

            <div className='rating-price-download'>
                <RatingButtons _id={post._id} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData} rating={true}/>
                {post.postType === 'product' ? <Price price={post.price} currency={post.currency} /> : null}
                <DownloadLink downloadLink={post.downloadLink} render={post.downloadLink}/>
            </div>

            {post.postType !== 'promotion' && post.postType !== 'article' ? <PostDescription description={post.description} translations={post.translations}/> : null}


            {/*<PostInfo {...post} rating='enable'/>*/}
            <PostMeta type='actors' data={post.actors || []}/>
            <PostMeta type='tags' data={post.tags || []}/>
            <PostMeta type='categories' data={post.categories || []}/>
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost' />
            </div>
            <CommentFrom documentId={post._id} />
            {comments?.length ? <CommentsRenderer comments={comments}/> : null}


        </PostPageStyledMain>
    );
};
export default PostPage;
