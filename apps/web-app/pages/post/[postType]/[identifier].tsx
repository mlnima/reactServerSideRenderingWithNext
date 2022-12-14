import {useEffect} from "react";
import {wrapper} from "../../../store_toolkit/store";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "../../../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import fetchViewPost
    from "../../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchViewPost";
import fetchPostComments
    from "../../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPostComments";
import fetchPost
    from "../../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPost";
import {useAppDispatch} from "../../../store_toolkit/hooks";
import _getServerSideStaticPageData from "../../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";

const Soft404 = dynamic(() =>
    import('../../../components/includes/Soft404/Soft404'))
const EditingActionQuickAccess = dynamic(() =>
    import('@components/pagesIncludes/post/components/common/EditingActionQuickAccess'))
const LearnTypePostPage = dynamic(() =>
    import('../../../components/pagesIncludes/post/templates/LearnTypePostPage/LearnTypePostPage'))
const VideoTypePostPage = dynamic(() =>
    import('../../../components/pagesIncludes/post/templates/VideoTypePostPage/VideoTypePostPage'))
const ArticleTypePostPage = dynamic(() =>
    import('../../../components/pagesIncludes/post/templates/ArticleTypePostPage/ArticleTypePostPage'))
const PromotionTypePostPage = dynamic(() =>
    import('../../../components/pagesIncludes/post/templates/PromotionTypePostPage/PromotionTypePostPage'))
const EventTypePostPage = dynamic(() =>
    import('../../../components/pagesIncludes/post/templates/EventTypePostPage/EventTypePostPage'))


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

    const {postType, _id, status, role, sidebar,author,userId} = useSelector(({posts, user, settings}: Store) => {
        return {
            postType: posts?.post?.postType,
            author: posts?.post?.author,
            _id: posts?.post?._id,
            role: user?.userData?.role,
            userId: user?.userData?._id,
            status: posts?.post?.status,
            sidebar: settings?.identity?.postPageSidebar,

        }
    });


    useEffect(() => {
        _id && dispatch(fetchPostComments(_id as string));
        _id && dispatch(fetchViewPost(_id));
    }, [_id])


    if (status === 'published' || (role === 'administrator' && !!status) || author?._id === userId ) {
        return (
            <>
                {(userId && (role === 'administrator' || author?._id === userId))  && <EditingActionQuickAccess role={role}/>}
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
    } else {
        return <Soft404/>
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
        fetchPost({
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

