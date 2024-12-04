import { unstable_cache } from 'next/cache'
import {getDictionary} from "../../../../../get-dictionary";
import {fetchPost,fetchPostViews,fetchPostRating} from "@lib/fetch-requests/fetchPosts";
import {fetchSettings} from "@lib/fetch-requests/fetchSettings";
import {fetchWidgets} from "@lib/fetch-requests/fetchWidgets";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import './page.styles.scss'
import postMetaGenerator from './components/postMetaGenerator/postMetaGenerator';
import PostAdminOrAuthorQuickAccessBar
    from "./components/PostAdminOrAuthorQuickAccessBar/PostAdminOrAuthorQuickAccessBar";
import Soft404 from "@components/Soft404/Soft404";
import NotFoundOrRestricted from "./components/NotFoundOrRestricted/NotFoundOrRestricted";

import PreviewPost from "./components/PreviewPost/PreviewPost";
import VideoTypePostPage from './components/VideoTypePostPage/VideoTypePostPage';
import ArticleTypePostPage from './components/ArticleTypePostPage/ArticleTypePostPage';
import PromotionTypePostPage from './components/PromotionTypePostPage/PromotionTypePostPage';
import LearnTypePostPage from './components/LearnTypePostPage/LearnTypePostPage';
import {IPageProps} from "@repo/typescript-types";
import localDetector from "@lib/localDetector";
//-------------------------------
import PostController from "@lib/database/controllers/PostController";


export const generateMetadata = postMetaGenerator;

const PostPage = async (props: IPageProps) => {
    const searchParams = await props.searchParams;
    const params = await props.params;

    const {
        identifier,
        postType
    } = params;


    const post = await PostController.getPostCached(identifier as string);

    console.log(`post=> `,post)



    const locale = localDetector(params.lang);
    const dictionary = await getDictionary(locale)
    const postData = {
        post
    }
    // const postData = identifier ? await fetchPost({identifier}) : {};
    const postViewData = await fetchPostViews({identifier:postData?.post?._id,revalidate: 120})
    const postRatingData = await fetchPostRating({identifier:postData?.post?._id})
    const settingsData = await fetchSettings({requireSettings: ['postPageSettings']})

    const widgetsData = await fetchWidgets({
        widgets: [
            'postPageLeftSidebar',
            'postPageRightSidebar',
            'underPost'
        ],
        locale
    });

    const sidebar = settingsData?.settings?.postPageSettings?.sidebar

    if (!postData?.post?._id) {
        return <Soft404 dictionary={dictionary}/>
    }

    if (postData?.post?.status !== 'published') {
        return (
            <>
                <PostAdminOrAuthorQuickAccessBar post={postData?.post} dictionary={dictionary}/>
                <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

                    <main id={'primary'} className='main postPage'>

                        {searchParams?.preview === 'true' && postType ?
                            <PreviewPost widgetsData={widgetsData}
                                         post={postData.post}
                                         views={postViewData?.views || 0}
                                         likes={postRatingData?.likes || 0}
                                         disLikes={postRatingData?.disLikes || 0}
                                         dictionary={dictionary}
                                         locale={locale}
                                         sidebar={sidebar || 'no'}
                                         postType={postType}
                                         relatedPosts={postData?.relatedPosts}

                            /> :
                            <NotFoundOrRestricted dictionary={dictionary}/>
                        }


                    </main>
                    <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['postPageLeftSidebar']}
                                               rightSideWidgets={widgetsData.widgets?.['postPageRightSidebar']}
                                               dictionary={dictionary}
                                               locale={locale}
                                               sidebar={sidebar || 'no'}
                                               position={'postPage'}/>
                </div>
            </>

        )
    }






    return (
        <>
            {/*<ViewPostClient _id={postData?.post?._id}/>*/}
            <PostAdminOrAuthorQuickAccessBar post={postData.post} dictionary={dictionary}/>

            <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

                <main id={'primary'} className={'main postPage'}>

                    {postType === 'video' ?
                        <VideoTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                           post={postData.post}
                                           views={postViewData?.views || 0}
                                           likes={postRatingData?.likes || 0}
                                           disLikes={postRatingData?.disLikes || 0}
                                           hasSidebar={sidebar}
                                           relatedPosts={postData.relatedPosts}
                                           dictionary={dictionary}
                                           locale={locale}/> : postType === 'article' ?
                            <ArticleTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                 post={postData.post}
                                                 views={postViewData?.views || 0}
                                                 likes={postRatingData?.likes || 0}
                                                 disLikes={postRatingData?.disLikes || 0}
                                                 hasSidebar={sidebar}
                                                 relatedPosts={postData.relatedPosts}
                                                 dictionary={dictionary} locale={locale}/> : postType === 'promotion' ?
                                <PromotionTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                       post={postData.post}
                                                       views={postViewData?.views || 0}
                                                       likes={postRatingData?.likes || 0}
                                                       disLikes={postRatingData?.disLikes || 0}
                                                       hasSidebar={sidebar}
                                                       relatedPosts={postData.relatedPosts}
                                                       dictionary={dictionary}
                                                       locale={locale}/> : postType === 'learn' ?
                                    <LearnTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                       post={postData.post}
                                                       views={postViewData?.views || 0}
                                                       likes={postRatingData?.likes || 0}
                                                       disLikes={postRatingData?.disLikes || 0}
                                                       hasSidebar={sidebar}
                                                       relatedPosts={postData.relatedPosts}
                                                       dictionary={dictionary} locale={locale}/> : null
                    }


                </main>
                <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['postPageLeftSidebar']}
                                           rightSideWidgets={widgetsData.widgets?.['postPageRightSidebar']}
                                           dictionary={dictionary}
                                           locale={locale}
                                           sidebar={sidebar || 'no'}
                                           position={'postPage'}/>
            </div>
        </>
    )
}

export default PostPage;
export const dynamic = 'force-dynamic'



//
// else if (postData?.post?.status !== 'published' && searchParams?.preview) {
//     return (
//         <>
//             <PreviewPost widgetsData={widgetsData}
//                          post={postData.post}
//                          dictionary={dictionary}
//                          locale={locale}
//                          sidebar={sidebar || 'no'}
//                          postType={postType}
//                          relatedPosts={postData.relatedPosts}
//
//             />
//         </>
//
//     )
// }