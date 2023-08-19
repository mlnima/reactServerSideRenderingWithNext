import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/PostsPage/PostsPageInfo";
import dynamic from "next/dynamic";
import {wrapper} from "@store_toolkit/store";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import getPostsAction from "@store_toolkit/clientReducers/postsReducers/getPostsAction";
import MetaAdminQuickAccessBar from "@components/pagesIncludes/metas/MetaAdminQuickAccessBar";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {textContentReplacer,getTextDataWithTranslation} from "custom-util";
import {useRouter} from "next/router";
import {useAppSelector} from "@store_toolkit/hooks";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

interface IStyles{
    customStyles?: string
}

let PageStyle = styled.div<IStyles>`

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

  ${({customStyles}) => customStyles || ''}
`

const categoryPage = () => {

    const category = useAppSelector(({ posts} ) => posts.categoryData)
    const {locale} = useRouter()
    const adminMode = useAppSelector(({globalState} ) =>  globalState?.adminMode);
    const currentPageSettings = useAppSelector(({settings} ) => settings?.currentPageSettings)
    const headDataSettings = useAppSelector(({settings} ) => settings?.initialSettings?.headDataSettings)


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

    return {
        props: {}
    }
});


export default categoryPage;

