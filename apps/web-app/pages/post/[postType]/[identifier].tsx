import {useEffect, useMemo, useState} from "react";
import {wrapper} from "../../../store_toolkit/store";
import dynamic from "next/dynamic";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import getPostAction from "@store_toolkit/clientReducers/postsReducers/getPostAction";
import getPostCommentsAction from "@store_toolkit/clientReducers/postsReducers/getPostCommentsAction";
import {clientAPIRequestViewPost} from "api-requests";
import {postTypes} from "data-structures";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {useRouter} from "next/router";
import {postCanonicalUrlGenerator} from "custom-util";

const Soft404 = dynamic(() =>
    import('@components/includes/Soft404/Soft404'))
const PostAdminQuickAccessBar = dynamic(() =>
    import('@components/pagesIncludes/post/components/common/PostAdminQuickAccessBar'), {ssr: false})
const LearnTypePostPage = dynamic(() =>
    import('@components/pagesIncludes/post/templates/LearnTypePostPage/LearnTypePostPage'))
const VideoTypePostPage = dynamic(() =>
    import('@components/pagesIncludes/post/templates/VideoTypePostPage/VideoTypePostPage'))
const ArticleTypePostPage = dynamic(() =>
    import('@components/pagesIncludes/post/templates/ArticleTypePostPage/ArticleTypePostPage'))
const PromotionTypePostPage = dynamic(() =>
    import('@components/pagesIncludes/post/templates/PromotionTypePostPage/PromotionTypePostPage'))
const EventTypePostPage = dynamic(() =>
    import('@components/pagesIncludes/post/templates/EventTypePostPage/EventTypePostPage'))
const NotFoundOrRestricted = dynamic(() =>
    import('@components/pagesIncludes/post/templates/NotFoundOrRestricted'))


const PageStyle = styled.div`
  .rating-price-download {
    width: 100%;
    background-color: var(--secondary-background-color, #181818);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media only screen and (min-width: 768px) {

    .rating-price-download {
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }
`


const postPage = () => {

    const dispatch = useAppDispatch()
    const {locale} = useRouter()
    const {
        postType,
        _id,
        status,
        author,
        title,
        description,
        tags,
        categories,
        actors
    } = useAppSelector(({posts}) => posts?.post);
    const {userData} = useAppSelector(({user}) => user);
    const sidebar = useAppSelector(({settings}) => settings?.currentPageSettings?.sidebar);
    const adminMode = useAppSelector(({globalState}) => globalState?.adminMode);


    useEffect(() => {
        if (_id) {
            setTimeout(() => {
                dispatch(getPostCommentsAction(_id as string));
                clientAPIRequestViewPost(_id);
            }, 500)
        }
    }, [_id])


    if (status === 'published' || adminMode || author?._id === userData?._id) {
        return (
            <>
                <HeadSetter title={title}
                            disAllowIndexByRobots={status !== 'published'}
                            canonicalUrl={postCanonicalUrlGenerator(postType as string, _id as string,locale as string)}
                            keywords={[...(tags || []), ...(categories || []), ...(actors || [])].map(meta => meta.name).join(',')}
                            description={postType !== 'learn' && typeof description === 'string' ? description : undefined}/>
                {adminMode && <PostAdminQuickAccessBar/>}
                <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>

                    {
                        postType === 'video' ? <VideoTypePostPage/> :
                            postType === 'learn' ? <LearnTypePostPage/> :
                                postType === 'promotion' ? <PromotionTypePostPage/> :
                                    postType === 'article' ? <ArticleTypePostPage/> :
                                        postType === 'event' ? <EventTypePostPage/> :
                                            null
                    }

                    <SidebarWidgetAreaRenderer sidebar={sidebar} position={'postPage'}/>
                </PageStyle>
            </>
        )


    } else if (!_id) {
        return <Soft404/>
    } else {
        return <>
            {adminMode && <PostAdminQuickAccessBar/>}
            <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
                <NotFoundOrRestricted/>
                <SidebarWidgetAreaRenderer sidebar={sidebar} position={'postPage'}/>
            </PageStyle>
        </>
    }


};



export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'postPageLeftSidebar',
            'postPageRightSidebar',
            'underPost'
        ],
        {
            page: 'postPage',
            setHeadData: false
        },
        store
    )

    await store.dispatch(
        getPostAction({
            options: {
                page: 'postPage'
            },
            identifier: context?.query?.id as string || context?.query?.identifier as string,
            context
        })
    )

    return {
        props: {}
    }
});

export default postPage;

