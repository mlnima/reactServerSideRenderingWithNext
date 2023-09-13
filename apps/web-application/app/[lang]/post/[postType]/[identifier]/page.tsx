import {i18n} from "../../../../../i18n-config";
import {getDictionary} from "../../../../../get-dictionary";
import dynamic from "next/dynamic";
import {fetchPost, fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import './page.styles.scss'
import postMetaGenerator from './components/postMetaGenerator/postMetaGenerator';
import PostAdminQuickAccessBar from "./components/PostAdminQuickAccessBar/PostAdminQuickAccessBar";
import Soft404 from "@components/Soft404/Soft404";
import NotFoundOrRestricted from "./components/NotFoundOrRestricted/NotFoundOrRestricted";

const VideoTypePostPage = dynamic(() => import('./components/VideoTypePostPage/VideoTypePostPage'))
const ArticleTypePostPage = dynamic(() => import('./components/ArticleTypePostPage/ArticleTypePostPage'))
const PromotionTypePostPage = dynamic(() => import('./components/PromotionTypePostPage/PromotionTypePostPage'))
const LearnTypePostPage = dynamic(() => import('./components/LearnTypePostPage/LearnTypePostPage'))


interface IProps {
    params: {
        lang: string
        identifier: string,
        postType: string
    }
}

export const generateMetadata = postMetaGenerator;


const PostPage = async ({params: {lang, identifier, postType}}: IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';
    const dictionary = await getDictionary(locale)
    const postData = await fetchPost(identifier)
    const settingsData = await fetchSettings({requireSettings: ['postPageSettings']})
    const widgetsData = await fetchWidgets(['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'], lang)
    const sidebar = settingsData?.settings?.postPageSettings?.sidebar

    if (!postData?.post?._id) {
        return <Soft404 dictionary={dictionary}/>
    }

    if (postData?.post?.status !== 'published') {
        return (
            <>
                <PostAdminQuickAccessBar post={postData?.post}/>
                <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

                    <main id={'primary'} className='main postPage'>

                        <NotFoundOrRestricted dictionary={dictionary}
                                              relatedPosts={postData.relatedPosts}
                                              hasSidebar={sidebar}
                                              locale={locale}
                                              post={postData.post}
                                              widgets={widgetsData.widgets?.['underPost']}/>


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
            <PostAdminQuickAccessBar post={postData.post}/>

            <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

                <main id={'primary'} className={'main postPage'}>

                    {postType === 'video' ?
                        <VideoTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                           post={postData.post}
                                           hasSidebar={sidebar}
                                           relatedPosts={postData.relatedPosts}
                                           dictionary={dictionary}
                                           locale={locale}/> : postType === 'article' ?
                            <ArticleTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                 post={postData.post}
                                                 hasSidebar={sidebar}
                                                 relatedPosts={postData.relatedPosts}
                                                 dictionary={dictionary} locale={locale}/> : postType === 'promotion' ?
                                <PromotionTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                       post={postData.post}
                                                       hasSidebar={sidebar}
                                                       relatedPosts={postData.relatedPosts}
                                                       dictionary={dictionary}
                                                       locale={locale}/> : postType === 'learn' ?
                                    <LearnTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                       post={postData.post}
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