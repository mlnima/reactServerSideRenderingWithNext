import React, {useEffect, useState} from 'react';
import PostPageStyledMain from '../PostPageStyle'
import {useSelector} from "react-redux";
import {StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import styled from "styled-components";
import PostTitle from '../components/PostTitle/PostTitle'
import LearnTypePostPageDescription from "./components/LearnTypePostPageDescription";
import * as Scroll from "react-scroll";
import {likeDislikeView} from "../../../../_variables/ajaxPostsVariables";
import {likeValueCalculator} from "../../../../_variables/_variables";

const EditLinkForAdmin = dynamic(() => import('../components/EditLinkForAdmin/EditLinkForAdmin'), {ssr: false})
const PostMetaDataToSiteHead = dynamic(() => import('../components/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))

const LearnTypePostPageStyledMain = styled(PostPageStyledMain)`
  max-width: 1300px;
  width: fit-content;

  .rating-price-download {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 98%;
    .link-to-source{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0;
    }
  }

  h1 {
    font-size: 4vw;
    width: 90%;
  }

  a {
    color: var(--main-active-color);
  }
`


const LearnTypePostPage = () => {
    const postPageStyle = useSelector((store: StoreTypes) => store?.settings?.design.postPageStyle)
    const comments = useSelector((store: StoreTypes) => store?.posts?.comments)
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)
    const post = useSelector((store: StoreTypes) => store.posts.post);

    const [ratingAndViewData, setRatingAndViewData] = useState({
        like: 0,
        disLike: 0,
        view: 0
    })

    const [state, setState] = useState({
        likeValue: 0,
        mode: 'view',
        isLiked: false,
        isDisliked: false,
    });

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


    // @ts-ignore
    return (
        <LearnTypePostPageStyledMain className='main post-page' postPageStyle={postPageStyle}>
            {userData?.role === 'administrator' ? <EditLinkForAdmin _id={post._id} status={post.status}/> : null}
            <PostMetaDataToSiteHead/>
            <PostTitle title={post.title} translations={post.translations}/>
            {/*// @ts-ignore*/}
            <LearnTypePostPageDescription description={post.description} translations={post.translations} source={post.source}/>
            <div className='rating-price-download'>
                <RatingButtons _id={post._id} ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData} rating={true}/>
                {post.source && post.source.includes('http') ?
                    <a href={post.source} className={'link-to-source btn btn-info'} target={'_blank'}>Source</a>
                    : null
                }
            </div>
            {post?.tags && post?.tags.length ? <PostMeta type='tags' data={post?.tags || []}/> : null}
            {post?.categories && post?.categories.length ? <PostMeta type='categories' data={post?.categories || []}/> : null}
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <CommentFrom documentId={post._id} documentTitle={post.title}/>
            {comments?.length ? <CommentsRenderer/> : null}
        </LearnTypePostPageStyledMain>
    );
};
export default LearnTypePostPage;
