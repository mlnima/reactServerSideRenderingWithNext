import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import * as Scroll from "react-scroll";
import {likeValueCalculator} from "../../../_variables/_variables";
import {getComments, likeDislikeView} from "../../../_variables/ajaxPostsVariables";
import dynamic from "next/dynamic";

const WidgetsRenderer = dynamic(() => import('../WidgetsRenderer/WidgetsRenderer'))
const EditLinkForAdmin = dynamic(() => import('./components/EditLinkForAdmin/EditLinkForAdmin'))
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
import styled from "styled-components";
import {useSelector} from "react-redux";

const PostPageStyledMain = styled.main`
  display: flex;
  justify-self: center;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  grid-area: main;

  .rating-price-download {
    width: 100%;
    background-color: var(--post-page-info-background-color, #181818);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .rate-logo {
      width: 30px;
      height: 35px;
      transition: .5s;

      &:hover {
        width: 35px;
        height: 40px;
      }
    }

    .price-information {
      margin: 0 20px;
      display: flex;
      align-items: center;
      font-size: 25px;
      font-weight: bold;

      .price-info-logo {
        width: 23px;
        height: 23px;
      }
    }
  }

  .promotion-thumbnail-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .main-thumbnail {
      margin: auto;
      max-width: 320px;
    }

    .redirect-link {
      color: var(--main-text-color);
      padding: 10px 20px;
      border: var(--main-text-color) 1px solid;
    }
  }

  @media only screen and (min-width: 768px) {
    .rating-price-download {
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  ${(props) => props?.postPageStyle || ''}
`

const PostPage = ({design, post, identity, comments, widgets}) => {
    const postPageStyle = useSelector(state => state?.settings.design.postPageStyle)
    const router = useRouter()

    const [state, setState] = useState({
        likeValue: 0,
        postAbsolutePath: '',
        mode: 'view',
        isLiked: false,
        isDisliked: false,
        svgDefaultStyle: {
            maxWidth: '25px',
            maxHeight: '25px'
        }
    });
    const [deviceWidth, setDeviceWidth] = useState(null)
    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })


    const [commentsData, setCommentsData] = useState(() => {
        return comments
    })

    useEffect(() => {
        Scroll.animateScroll.scrollToTop();
        if (typeof window !== 'undefined') {
            setDeviceWidth(window.innerWidth)
        }
        likeDislikeView(post._id, 'views').then(res => {
            if (res.data.updatedData) {

                setRatingAndViewData(res.data.updatedData)
            }
        })

    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setState({
                ...state,
                likeValue: likeValueCalculator(post.likes, post.disLikes),
                postAbsolutePath: window.location.href
            });
        }

    }, [post.likes, post.disLikes]);

    const reGetComments = async () => {
        try {
            const commentsReq = await getComments({onDocument: post._id}, process.env.NEXT_PUBLIC_PRODUCTION_URL, true)
            setCommentsData(post ? commentsReq?.data?.comments : [])
        } catch (err) {

        }

    }


    return (
        <PostPageStyledMain className='main post-page' postPageStyle={postPageStyle}>

            <EditLinkForAdmin _id={post._id}/>

            <PostMetaDataToSiteHead {...post} url={router.asPath}/>

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
                <RatingButtons _id={post._id} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData}/>
                {post.postType === 'product' ? <Price price={post.price} currency={post.currency} svgDefaultStyle={state.svgDefaultStyle}/> : null}
                <DownloadLink downloadLink={post.downloadLink} render={post.downloadLink} svgDefaultStyle={state.svgDefaultStyle}/>
            </div>

            {post.postType !== 'promotion' && post.postType !== 'article' ? <PostDescription description={post.description} translations={post.translations}/> : null}


            {/*<PostInfo {...post} rating='enable'/>*/}
            <PostMeta type='actors' data={post.actors || []}/>
            <PostMeta type='tags' data={post.tags || []}/>
            <PostMeta type='categories' data={post.categories || []}/>
            {(widgets || []).filter(widget => widget.data.position === 'underPost').length > 0 ?
                <div className='under-post-widget-area'>
                    <WidgetsRenderer deviceWidth={deviceWidth}
                                     widgets={(widgets || []).filter(widget => widget.data.position === 'underPost')}
                                     position='underPost'
                                     postElementSize={design?.data?.postElementSize}/>
                </div> : null}
            <CommentFrom reGetComments={reGetComments} documentId={post._id} documentTitle={post.title}/>
            {comments?.length > 0 ? <CommentsRenderer reGetComments={reGetComments} comments={commentsData}/> : null}


        </PostPageStyledMain>
    );
};
export default PostPage;
