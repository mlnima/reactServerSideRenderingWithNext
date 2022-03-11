import PostPageStyledMain from '../PostPageStyle'
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
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
const RatingButtons = dynamic(() => import('../components/RatingButtons/RatingButtons'))

const LearnTypePostPageStyledMain = styled(PostPageStyledMain)`
  max-width: 1300px;
  width: fit-content;

  .rating-price-download {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 98%;

    .link-to-source {
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

    const learnTypePostPageData = useSelector(({settings, posts, user}: StoreTypes) => {
        return {
            postPageStyle: settings?.design.postPageStyle,
            post: posts.post,
            userData: user?.userData
        }
    })

    return (
        <LearnTypePostPageStyledMain className='main post-page' postPageStyle={learnTypePostPageData.postPageStyle}>
            {learnTypePostPageData.userData?.role === 'administrator' ?
                <EditLinkForAdmin _id={learnTypePostPageData.post._id} status={learnTypePostPageData.post.status}/>
                : null
            }
            <PostMetaDataToSiteHead/>
            <PostTitle/>
            <LearnTypePostPageDescription/>
            <div className='rating-price-download'>
                <RatingButtons rating={true}/>
                {learnTypePostPageData.post.source && learnTypePostPageData.post.source.includes('http') ?
                    <a href={learnTypePostPageData.post.source} className={'link-to-source btn btn-info'}
                       target={'_blank'}>Source</a>
                    : null
                }
            </div>
            <PostMeta type='tags'/>
            <PostMeta type='categories'/>
            <div className='under-post-widget-area'>
                <WidgetsRenderer position='underPost'/>
            </div>
            <CommentFrom/>
            {learnTypePostPageData.post.comments?.length ? <CommentsRenderer/> : null}
        </LearnTypePostPageStyledMain>
    );
};
export default LearnTypePostPage;
