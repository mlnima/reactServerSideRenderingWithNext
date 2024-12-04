'use client';
import {FC} from "react";
import {Post} from "@repo/typescript-types";
import {Widget} from "@repo/typescript-types";
import dynamic from "next/dynamic";
import Csr from "@components/global/Csr";
import {useAppSelector} from "@store/hooks";
import NotFoundOrRestricted from "../NotFoundOrRestricted/NotFoundOrRestricted";
const VideoTypePostPage = dynamic(() => import('../VideoTypePostPage/VideoTypePostPage'))
const ArticleTypePostPage = dynamic(() => import('../ArticleTypePostPage/ArticleTypePostPage'))
const PromotionTypePostPage = dynamic(() => import('../PromotionTypePostPage/PromotionTypePostPage'))
const LearnTypePostPage = dynamic(() => import('../LearnTypePostPage/LearnTypePostPage'))


// import VideoTypePostPage from "../VideoTypePostPage/VideoTypePostPage";
// import LearnTypePostPage from "../LearnTypePostPage/LearnTypePostPage";
// import ArticleTypePostPage from "../ArticleTypePostPage/ArticleTypePostPage";
// import PromotionTypePostPage from "../PromotionTypePostPage/PromotionTypePostPage";

interface IProps {
    post: Post,
    locale: string,
    sidebar: string,
    postType: string,
    views:number,
    likes:number,
    disLikes:number,
    dictionary: {
        [key: string]: string
    },
    widgetsData: {
        widgets: {
            [key: string]: Widget[]
        }
    }
    relatedPosts: Post[],
}

const PreviewPost: FC<IProps> =
    ({
         post,
         locale,
         dictionary,
         relatedPosts,
         sidebar,
         widgetsData,
         postType,
         views,
         likes,
         disLikes
    }) => {
    const {userData} = useAppSelector(({user}) => user)
    const {loggedIn} = useAppSelector(({user}) => user)

    if (
        (userData?._id === post?.author?._id || userData?.role ==='administrator')&&
        loggedIn) {
        return (
            <>
                <Csr>
                {
                    postType === 'video' ?
                        <VideoTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                           post={post}
                                           views={views}
                                           likes={likes}
                                           disLikes={disLikes}
                                           hasSidebar={sidebar}
                                           relatedPosts={relatedPosts}
                                           dictionary={dictionary}
                                           locale={locale}/> :
                        postType === 'article' ?
                            <ArticleTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                 post={post}
                                                 views={views}
                                                 likes={likes}
                                                 disLikes={disLikes}
                                                 hasSidebar={sidebar}
                                                 relatedPosts={relatedPosts}
                                                 dictionary={dictionary} locale={locale}/> :
                            postType === 'promotion' ?
                                <PromotionTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                       post={post}
                                                       views={views}
                                                       likes={likes}
                                                       disLikes={disLikes}
                                                       hasSidebar={sidebar}
                                                       relatedPosts={relatedPosts}
                                                       dictionary={dictionary}
                                                       locale={locale}/> : postType === 'learn' ?
                                    <LearnTypePostPage widgets={widgetsData.widgets?.['underPost']}
                                                       post={post}
                                                       views={views}
                                                       likes={likes}
                                                       disLikes={disLikes}
                                                       hasSidebar={sidebar}
                                                       relatedPosts={relatedPosts}
                                                       dictionary={dictionary} locale={locale}/> : null
                }
                </Csr>
            </>

        )
    } else {
        return (
            <NotFoundOrRestricted dictionary={dictionary}/>
        )
    }


};
export default PreviewPost

// <div id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
//
//
//     <main id={'primary'} className={'main postPage'}>


// {/*    </main>*/}
// {/*    <SidebarWidgetAreaRenderer leftSideWidgets={widgetsData.widgets?.['postPageLeftSidebar']}*/}
// {/*                               rightSideWidgets={widgetsData.widgets?.['postPageRightSidebar']}*/}
// {/*                               dictionary={dictionary}*/}
// {/*                               locale={locale}*/}
// {/*                               sidebar={sidebar || 'no'}*/}
// {/*                               position={'postPage'}/>*/}
// {/*</div>*/}
// {/*</Csr>*/}