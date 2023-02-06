import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/PostsPage/PostsPageInfo";
import dynamic from "next/dynamic";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import SidebarWidgetAreaRenderer from "../../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostsAction from "@store_toolkit/clientReducers/postsReducer/getPostsAction";
import MetaAdminQuickAccessBar from "@components/pagesIncludes/metas/MetaAdminQuickAccessBar";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

let PageStyle = styled.div`

  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({tagPageStyle}: { tagPageStyle: string }) => tagPageStyle || ''}
`
const tagPage = () => {

    const { tag, tagPageStyle, sidebar} = useSelector(({user, posts, settings}: Store) => {
        return {
            tag: posts.tagData,
            tagPageStyle: settings.design?.tagPageStyle,
            sidebar: settings?.identity?.tagPageSidebar
        }
    })

    const role = useSelector(({user}: Store) => user?.userData?.role);
    const adminMode = useSelector(({globalState}: Store) =>  globalState?.adminMode);

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} tagPageStyle={tagPageStyle}>
            <main id={'primary'} className="main posts-page">
                {(!!adminMode && role === 'administrator') && <MetaAdminQuickAccessBar metaId={tag._id}/>}
                {!!tag && <PostsPageInfo titleEntry={tag.name}/> }

                <WidgetsRenderer
                    position={'tagPageTop'}
                />
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer
                    position={'tagPageBottom'}
                />
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'tagPage'}/>
        </PageStyle>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'tagPageTop',
            'tagPageLeftSidebar',
            'tagPageBottom',
            'tagPageRightSidebar'
        ], {
            page: 'tag',
            setHeadData: false
        },
        store)

    await store.dispatch(
        getPostsAction({
                context,
                metaId: context?.query?.tagId as string,
                options: {
                    page: 'tag',
                    setHeadData:true
                },
            }
        ))


    return null
});

export default tagPage;

