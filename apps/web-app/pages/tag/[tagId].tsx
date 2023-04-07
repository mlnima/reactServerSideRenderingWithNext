import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/PostsPage/PostsPageInfo";
import dynamic from "next/dynamic";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostsAction from "@store_toolkit/clientReducers/postsReducers/getPostsAction";
import MetaAdminQuickAccessBar from "@components/pagesIncludes/metas/MetaAdminQuickAccessBar";
import {useRouter} from "next/router";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import textContentReplacer from "custom-util/src/string-util/textContentReplacer";
import {getTextDataWithTranslation} from "custom-util";

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

  ${({customStyles}: { customStyles?: string }) => customStyles || ''}
`
const tagPage = () => {

    const tag = useSelector(({posts}: Store) => posts.tagData)
    const role = useSelector(({user}: Store) => user?.userData?.role);
    const adminMode = useSelector(({globalState}: Store) =>  globalState?.adminMode);
    const currentPageSettings = useSelector(({settings}: Store) => settings?.currentPageSettings)
    const headDataSettings = useSelector(({settings}: Store) => settings?.initialSettings?.headDataSettings)
    const {locale} = useRouter()

    return (
        <PageStyle id={'content'} className={`page-${currentPageSettings?.sidebar || 'no'}-sidebar `}
                   customStyles={currentPageSettings?.customStyles}>
            <HeadSetter title={ currentPageSettings?.title ?
                textContentReplacer(currentPageSettings?.title,
                    {name:tag?.name,count:tag?.count,siteName:headDataSettings.siteName}
                ): getTextDataWithTranslation(locale as string,'title',tag,)}  />
            <main id={'primary'} className="main posts-page">
                {adminMode && <MetaAdminQuickAccessBar metaId={tag._id}/>}
                {!!tag && <PostsPageInfo titleEntry={tag.name}/> }
                <WidgetsRenderer position={'tagPageTop'}/>
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer position={'tagPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={currentPageSettings?.sidebar} position={'tagPage'}/>
        </PageStyle>
    )
};

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'tagPageTop',
            'tagPageLeftSidebar',
            'tagPageBottom',
            'tagPageRightSidebar'
        ], {
            page: 'tagPage',
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
                }
            }
        ))
    return null
});

export default tagPage;

