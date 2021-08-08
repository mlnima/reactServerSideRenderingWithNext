import {useEffect, useState, useContext} from 'react';
import {getFirstLoadData} from "../../../_variables/ajaxVariables";
import {getComments, getPost, likeDislikeView} from "../../../_variables/ajaxPostsVariables";
import {useRouter} from "next/router";
import {likeValueCalculator} from "../../../_variables/_variables";

import dynamic from "next/dynamic";
const Error = dynamic(() => import('../../_error'))
const VideoPlayer = dynamic(() => import('../../../components/includes/Post/VideoPlayer/VideoPlayer'))
const CommentFrom = dynamic(() => import('../../../components/includes/Post/CommentFrom/CommentFrom'))
const CommentsRenderer = dynamic(() => import('../../../components/includes/CommentsRenderer/CommentsRenderer'))
const SlideShow = dynamic(() => import('../../../components/includes/Post/SlideShow/SlideShow'))
const WidgetsRenderer = dynamic(() => import('../../../components/includes/WidgetsRenderer/WidgetsRenderer'))
const PostMetaDataToSiteHead = dynamic(() => import('../../../components/includes/Post/PostMetaDataToSiteHead/PostMetaDataToSiteHead'))
const EditLinkForAdmin = dynamic(() => import('../../../components/includes/Post/PostInfo/EditLinkForAdmin/EditLinkForAdmin'))
const PostDescription = dynamic(() => import('../../../components/includes/Post/PostInfo/PostDescription/PostDescription'))
const PostTitle = dynamic(() => import('../../../components/includes/Post/PostInfo/PostTitle/PostTitle'))
const RatingButtons = dynamic(() => import('../../../components/includes/Post/PostInfo/RatingButtons/RatingButtons'))
const Price = dynamic(() => import('../../../components/includes/Post/PostInfo/Price/Price'))
const DownloadLink = dynamic(() => import('../../../components/includes/Post/DownloadLink/DownloadLink'))
const PostMeta = dynamic(() => import('../../../components/includes/Post/PostMeta/PostMeta'))

import {AppContext} from "../../../context/AppContext";

const postPage = ({responseCode, design, post, identity, comments, widgets}) => {
    const contextData = useContext(AppContext);
    const router= useRouter()
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
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setDeviceWidth(window.innerWidth)
        }

    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setState({
                ...state,
                likeValue: likeValueCalculator(post.likes, post.disLikes),
                postAbsolutePath: window.location.href
            });
        }
        likeDislikeView(post._id, 'views').then(res => {
            if (res.data.updatedData) {
                setRatingAndViewData(res.data.updatedData)
            }
        })
    }, [post.likes, post.disLikes]);



    if (responseCode !== 200) {
        return <Error responseCode={responseCode}/>
    }  else return (
            <main  className='main post-page'>

            <style jsx>{`
                .post-page{
                    justify-self: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                }
                .rating-price-download{
                    width: 100%;
                    background-color: var(--post-page-info-background-color);
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                        .rate-logo{
                            width: 30px ;
                            height: 35px;
                            transition: .5s;
                            &:hover{
                                width: 35px ;
                                height: 40px;
                            }
                        }
                    .price-information{
                        margin: 0 20px;
                        display: flex;
                        align-items: center;
                        font-size: 25px;
                        font-weight: bold;
                        .price-info-logo{
                            width: 23px;
                            height: 23px;
                        }
                    }
                }
                .promotion-thumbnail-link{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .main-thumbnail{
                        margin: auto;
                        max-width: 320px;
                    }
                    .redirect-link{
                        color:var(--main-text-color) ;
                        padding: 10px 20px;
                        border: var(--main-text-color) 1px solid;
                    }
                }
                @media only screen and (min-width: 768px) {
                    .rating-price-download{
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    }
                }
            `}</style>

                <EditLinkForAdmin _id={post._id}/>

                <PostMetaDataToSiteHead {...post} url={router.asPath}/>

                {post.postType === 'video' ? <VideoPlayer post={post}/> :null}

                {post.postType === 'product' ? <SlideShow post={post} sidebar={identity?.data?.postPageSidebar} deviceWidth={deviceWidth}/> :null}

                {post.postType === 'promotion' ?<PostTitle  description={post.description} translations={post.translations}/> :null}

                <div className='promotion-thumbnail-link'>
                    {post.mainThumbnail && post.postType === 'promotion' ? <a href={post.redirectLink}><img className='main-thumbnail' src={post.mainThumbnail} alt="title"/></a>:null}
                    {post.mainThumbnail && post.postType === 'promotion' ? <a href={post.redirectLink} className='redirect-link'>go to {post.title}</a>:null}
                </div>

                {post.postType === 'promotion' ?<PostDescription  description={post.description} translations={post.translations}/> :null}

                {post.postType !== 'promotion' ? <PostTitle  title={post.title} translations={post.translations}/> :null}

                <div className='rating-price-download'>
                    <RatingButtons _id={post._id}  ratingAndViewData={ratingAndViewData} setRatingAndViewData={setRatingAndViewData}/>
                    { post.postType === 'product'? <Price price={post.price} currency={post.currency}  svgDefaultStyle={state.svgDefaultStyle}/>: null}
                    <DownloadLink downloadLink={post.downloadLink} render={post.downloadLink} svgDefaultStyle={state.svgDefaultStyle}/>
                </div>

                {post.postType !== 'promotion' ?<PostDescription  description={post.description} translations={post.translations}/> :null}


                {/*<PostInfo {...post} rating='enable'/>*/}
                <PostMeta  type='actors' data={post.actors || []}/>
                <PostMeta  type='tags' data={post.tags || []}/>
                <PostMeta  type='categories' data={post.categories || []}/>
                {comments?.length > 0 ? <CommentsRenderer comments={comments}/> : null}
                <CommentFrom documentId={post._id} documentTitle={post.title}/>
                {(widgets || []).filter(widget => widget.data.position === 'underPost').length > 0 ?
                    <div className='under-post-widget-area'>
                        <WidgetsRenderer deviceWidth={deviceWidth}
                                         widgets={(widgets || []).filter(widget => widget.data.position === 'underPost')}
                                         position='underPost'
                                         postElementSize={design?.data?.postElementSize || contextData.siteDesign.postElementSize}/>
                    </div> : null}

            </main>
    );
};



export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'], 'postPage')
    let responseCode = 200
    const postData = await getPost({_id: context.query.id, title: context.query.title}, firstLoadData.domainName, true)
    const post = postData?.data?.post;
    if (!post) {
        return {
            notFound: true
        }
    }
    const commentsData = post ? await getComments({onDocument: post._id}, firstLoadData.domainName, true) : {}
    const widgets = firstLoadData.widgets
    const comments = post ? commentsData?.data?.comments : []

    return {
        props: {
            widgets,
            ...firstLoadData.settings,
            post: post || responseCode,
            query: context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            comments,
            referer: firstLoadData.referer,
            responseCode
        }
    }
}


export default postPage;

//stylesData={design?.data?.postPageStyle || contextData.siteDesign.postPageStyle || ''}



// else if(post.postType === 'promotion'){
//
//     return (
//         <PostPagePromotionType post={post} />
//     )
// }