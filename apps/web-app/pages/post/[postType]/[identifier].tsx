import {useEffect, useMemo, useState} from "react";
import {wrapper} from "../../../store_toolkit/store";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostAction from "@store_toolkit/clientReducers/postsReducer/getPostAction";
import getPostCommentsAction from "@store_toolkit/clientReducers/postsReducer/getPostCommentsAction";
import viewPost from "api-requests/src/client/posts/viewPost";
import {postTypes} from "data-structures";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {_postCanonicalUrlGenerator} from "@_variables/_clientVariables/clientVariables/_canonicalUrlGenerators";
import {useRouter} from "next/router";

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
    } = useSelector(({posts}: Store) => posts?.post);
    const {userData} = useSelector(({user}: Store) => user)
    const sidebar = useSelector(({settings}: Store) => settings?.currentPageSettings?.sidebar);

    const adminMode = useSelector(({globalState}: Store) => globalState?.adminMode);


    useEffect(() => {
        if (_id) {
            setTimeout(() => {
                dispatch(getPostCommentsAction(_id as string));
                viewPost(_id);
            }, 500)
        }
    }, [_id])


    if (status === 'published' || adminMode || author?._id === userData?._id) {
        return (
            <>
                <HeadSetter title={title}
                            disAllowIndexByRobots={status !== 'published'}
                            canonicalUrl={_postCanonicalUrlGenerator(postType, _id,locale)}
                            keywords={[...(tags || []), ...(categories || []), ...(actors || [])].map(meta => meta.name).join(',')}
                            description={postType !== 'learn' && typeof description === 'string' ? description : undefined}/>
                {(adminMode && userData?.role === 'administrator') && <PostAdminQuickAccessBar role={userData?.role}/>}
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
            {(adminMode || author?._id === userData?._id) && <PostAdminQuickAccessBar role={userData?.role}/>}
            <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}>
                <NotFoundOrRestricted/>
                <SidebarWidgetAreaRenderer sidebar={sidebar} position={'postPage'}/>
            </PageStyle>
        </>
    }


};


//@ts-ignore
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

    return null
});

export default postPage;

