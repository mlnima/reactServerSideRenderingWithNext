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
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {textContentReplacer} from "custom-util";
import {getTextDataWithTranslation} from "custom-util";
import {useRouter} from "next/router";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

let PageStyle = styled.div`

  .edit-as-admin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({customStyles}: { customStyles: string }) => customStyles || ''}
`

const categoryPage = () => {

    const category = useSelector(({ posts}: Store) => posts.categoryData)
    const {locale} = useRouter()
    const role = useSelector(({user}: Store) => user?.userData?.role);
    const adminMode = useSelector(({globalState}: Store) =>  globalState?.adminMode);
    const currentPageSettings = useSelector(({settings}: Store) => settings?.currentPageSettings)
    const headDataSettings = useSelector(({settings}: Store) => settings?.initialSettings?.headDataSettings)


    return (

        <PageStyle id={'content'} className={`page-${currentPageSettings?.sidebar || 'no'}-sidebar `}
                   //@ts-ignore
                   customStyles={currentPageSettings?.customStyles}>
            <HeadSetter title={ currentPageSettings?.title ?
                textContentReplacer(currentPageSettings?.title,
                    {name:category?.name,count:category?.count,siteName:headDataSettings.siteName}
                ): getTextDataWithTranslation(locale as string,'title',category)}  />
            <main id={'primary'} className="main posts-page">
                {adminMode && <MetaAdminQuickAccessBar metaId={category._id}/>}
                {category?.name && <PostsPageInfo titleEntry={category.name}/>}
                <WidgetsRenderer position={'categoryPageTop'}/>
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer position={'categoryPageBottom'}/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={currentPageSettings?.sidebar} position={'categoryPage'}/>
        </PageStyle>

    )
};

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'categoryPageTop',
            'categoryPageLeftSidebar',
            'categoryPageBottom',
            'categoryPageRightSidebar'
        ],
        {
            page:'categoryPage',
            setHeadData:false
        },
        store
    )

    await store.dispatch(
        getPostsAction({
                context,
                metaId: context?.query?.categoryId as string,
                options: {
                    page: 'category',
                    setHeadData:true
                }
            }
        ))
    return null
});


export default categoryPage;

