import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import ActorBio from '../../components/includes/cards/CardsRenderer/ActorBio/ActorBio'
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostsAction from "@store_toolkit/clientReducers/postsReducers/getPostsAction";
import MetaAdminQuickAccessBar from "@components/pagesIncludes/metas/MetaAdminQuickAccessBar";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import textContentReplacer from "custom-util/src/string-util/textContentReplacer";
import {getTextDataWithTranslation} from "custom-util";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

const PageStyle = styled.div`
  width: 100%;
  height: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({customStyles}: { customStyles?: string }) => customStyles || ''}

`

const actorPage = () => {
    const {locale} = useRouter()
    const actor = useSelector(({posts}: Store) => posts?.actorData)
    const currentPageSettings = useSelector(({settings}: Store) => settings?.currentPageSettings)
    const headDataSettings = useSelector(({settings}: Store) => settings?.initialSettings?.headDataSettings)
    const adminMode = useSelector(({globalState}: Store) => globalState?.adminMode);

    return (
        <PageStyle id={'content'} className={`page-${currentPageSettings?.sidebar || 'no'}-sidebar`}
                   customStyles={currentPageSettings?.customStyles}>

            <HeadSetter title={currentPageSettings?.title ?
                textContentReplacer(currentPageSettings?.title,
                    {name: actor?.name, count: actor?.count, siteName: headDataSettings.siteName}
                ) : getTextDataWithTranslation(locale as string, 'title', actor,)}/>
            <main id={'primary'} className="main posts-page">
                {adminMode && <MetaAdminQuickAccessBar metaId={actor._id}/>}
                <ActorBio/>
                <WidgetsRenderer position='actorPageTop'/>
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer position='actorPageBottom'/>
            </main>
            <SidebarWidgetAreaRenderer sidebar={currentPageSettings?.sidebar} position={'actorPage'}/>
        </PageStyle>
    )
};

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'actorPageTop',
            'actorPageLeftSidebar',
            'actorPageBottom',
            'actorPageRightSidebar'
        ],
        {
            page: 'actorPage',
            setHeadData: false
        },
        store
    )

    await store.dispatch(
        getPostsAction({
                context,
                metaId: context?.query?.actorId as string,
                options: {
                    page: 'actor',
                    setHeadData: true
                }
            }
        ))

    return null
});


export default actorPage;

