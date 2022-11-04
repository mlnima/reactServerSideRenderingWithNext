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
const EditLinkForAdmin = dynamic(() =>
    import('../../../components/includes/PostPage/components/EditLinkForAdmin/EditLinkForAdmin'))
const LearnTypePostPage = dynamic(() =>
    import('../../../components/includes/PostPage/LearnTypePostPage/LearnTypePostPage'))
const VideoTypePostPage = dynamic(() =>
    import('../../../components/includes/PostPage/VideoTypePostPage/VideoTypePostPage'))
const ArticleTypePostPage = dynamic(() =>
    import('../../../components/includes/PostPage/ArticleTypePostPage/ArticleTypePostPage'))
const PromotionTypePostPage = dynamic(() =>
    import('../../../components/includes/PostPage/PromotionTypePostPage/PromotionTypePostPage'))
const EventTypePostPage = dynamic(() =>
    import('../../../components/includes/PostPage/EventTypePostPage/EventTypePostPage'))


const PageStyle = styled.div`
  .rating-price-download {
    width: 100%;
    background-color: var(--post-page-info-background-color, #181818);
    display: flex;
    justify-content: center;
    flex-wrap: wrap;


    .rating-buttons {
      .rating-item {
        svg {
          width: 24px;
          height: 24px;
        }
      }

    }
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

    const {postType, _id, status, role, sidebar} = useSelector(({posts, user, settings}: Store) => {
        return {
            postType: posts?.post?.postType,
            _id: posts?.post?._id,
            role: user?.userData?.role,
            status: posts?.post?.status,
            sidebar: settings?.identity?.postPageSidebar,

        }
    });


    useEffect(() => {
        _id && dispatch(fetchPostComments(_id as string));
        _id && dispatch(fetchViewPost(_id));
    }, [_id])


    if (status === 'published' || (role === 'administrator' && !!status)) {
        return (
            <>
                {role === 'administrator' ? <EditLinkForAdmin/> : null}
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

    // @ts-ignore
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

    //@ts-ignore
    // context.query?.identifier && await store.dispatch(getPost(context.query?.identifier as string, context.locale as string))
    // if (context.query?.identifier){
    //     await store.dispatch(
    //         fetchPost({
    //             options: {
    //                 page: 'postPage'
    //             },
    //             identifier: context?.query?.id as string || context?.query?.identifier as string,
    //             context
    //         })
    //     )
    // }

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

