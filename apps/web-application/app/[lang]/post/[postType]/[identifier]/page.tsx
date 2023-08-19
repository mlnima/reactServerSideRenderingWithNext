import {i18n} from "../../../../../i18n-config";
import {getDictionary} from "../../../../../get-dictionary";
import dynamic from "next/dynamic";
import {fetchPost, fetchSettings, fetchWidgets} from "fetch-requests";
import SidebarWidgetAreaRenderer
    from "@components/widgets/widgetAreas/SidebarWidgetAreaRenderer/SidebarWidgetAreaRenderer";
import './page.styles.scss'
import  postMetaGenerator from './components/postMetaGenerator/postMetaGenerator';
import PostAdminQuickAccessBar from "./components/PostAdminQuickAccessBar/PostAdminQuickAccessBar";

const VideoTypePostPage = dynamic(() => import('./components/VideoTypePostPage/VideoTypePostPage'))


interface IProps {
    params: {
        lang: string
        identifier: string,
        postType: string
    }
}

export const generateMetadata = postMetaGenerator  ;


const PostPage = async ({params: {lang, identifier, postType}}:IProps) => {

    const locale = i18n.locales.includes(lang) ? lang : process.env?.NEXT_PUBLIC_DEFAULT_LOCAL || 'en';
    const dictionary = await getDictionary(locale)
    const postData = await fetchPost(identifier)
    const settingsData = await fetchSettings(['postPageSettings'])
    const widgetsData = await fetchWidgets(['postPageLeftSidebar', 'postPageRightSidebar', 'underPost'], lang)
    const sidebar = settingsData?.settings?.postPageSettings?.sidebar

    return (
        <>
            <main id={'content'} className={`page-${sidebar || 'no'}-sidebar inner-content`}>
                <PostAdminQuickAccessBar post={postData.post}/>
                {postType === 'video' ?
                    <VideoTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                       post={postData.post}
                                       hasSidebar={sidebar}
                                       dictionary={dictionary} locale={locale}/> : null}

                <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['postPageLeftSidebar']}
                                           rightSideWidgets={widgetsData.widgets?.['postPageRightSidebar']}
                                           dictionary={dictionary}
                                           locale={locale}
                                           sidebar={sidebar || 'no'}
                                           position={'postPage'}/>
            </main>
        </>
    )
}

export default PostPage;