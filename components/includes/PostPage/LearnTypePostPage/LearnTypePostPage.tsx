import React from 'react';
import PostPageStyledMain from '../PostPageStyle'
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {settingsPropTypes, StoreTypes} from "../../../../_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import styled from "styled-components";
import PostTitle from '../components/PostTitle/PostTitle'
import LearnTypePostPageDescription from "./components/LearnTypePostPageDescription";

const EditLinkForAdmin = dynamic(() => import('../components/EditLinkForAdmin/EditLinkForAdmin'), {ssr: false})
const PostMetaDataToSiteHead = dynamic(() => import('../components/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const PostMeta = dynamic(() => import('../components/PostMeta/PostMeta'))
const CommentsRenderer = dynamic(() => import('../components/CommentsRenderer/CommentsRenderer'))
const CommentFrom = dynamic(() => import('../components/CommentFrom/CommentFrom'))
const WidgetsRenderer = dynamic(() => import('../../WidgetsRenderer/WidgetsRenderer'))

// interface LearnTypePostPageTypes {
//     design: string,
//     post: object,
//     identity: object,
//     comments: object[],
//     widgets: object[]
// }


const LearnTypePostPageStyledMain = styled(PostPageStyledMain)`
  max-width: 1300px;

  h1 {
    font-size: 4vw;
    width: 90%;
  }

  a {
    color: var(--main-active-color);
  }
`


const LearnTypePostPage = ( ) => {
    const postPageStyle = useSelector((store: StoreTypes) => store?.settings?.design.postPageStyle)
    const comments = useSelector((store: StoreTypes) => store?.posts?.comments)
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)
    const post = useSelector((store: settingsPropTypes) => store.posts.post);
    const router = useRouter()

    // @ts-ignore
    return (
        <LearnTypePostPageStyledMain className='main post-page' postPageStyle={postPageStyle}>
            {userData?.role === 'administrator' ? <EditLinkForAdmin _id={post._id}/> : null}
            <PostMetaDataToSiteHead {...post} url={router.asPath}/>
            <PostTitle title={post.title} translations={post.translations}/>
            {/*// @ts-ignore*/}
            <LearnTypePostPageDescription description={post.description} translations={post.translations}/>
            {post?.tags && post?.tags.length ? <PostMeta type='tags' data={post?.tags || []}/> :null }
            {post?.categories && post?.categories.length ? <PostMeta type='categories' data={post?.categories || []}/> :null }
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <CommentFrom documentId={post._id} documentTitle={post.title}/>
            {comments?.length ? <CommentsRenderer/> : null}
        </LearnTypePostPageStyledMain>
    );
};
export default LearnTypePostPage;
