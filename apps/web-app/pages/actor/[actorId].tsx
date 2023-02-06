import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
// import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {wrapper} from "../../store_toolkit/store";
import {useSelector} from "react-redux";
import Link from "next/link";

import SidebarWidgetAreaRenderer from "../../components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import ActorBio from '../../components/includes/cards/CardsRenderer/ActorBio/ActorBio'
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostsAction from "@store_toolkit/clientReducers/postsReducer/getPostsAction";
import MetaAdminQuickAccessBar from "@components/pagesIncludes/metas/MetaAdminQuickAccessBar";

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

  ${(props: { stylesData: string }) => props.stylesData || ''}

`

const actorPage = () => {

    const {actor, actorPageStyle, sidebar} = useSelector(({user, settings,posts}: Store) => {
        return {
            actor:  posts?.actorData,
            actorPageStyle: settings?.design?.actorPageStyle,
            sidebar: settings?.identity?.actorPageSidebar
        }
    })

    const role = useSelector(({user}: Store) => user?.userData?.role);
    const adminMode = useSelector(({globalState}: Store) =>  globalState?.adminMode);


    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`} stylesData={actorPageStyle}>
            <main id={'primary'} className="main posts-page">
                {(!!adminMode && role === 'administrator') && <MetaAdminQuickAccessBar metaId={actor._id}/>}

                <ActorBio/>
                <WidgetsRenderer
                    position='actorPageTop'
                />
                <PostsPage renderPagination={true}/>
                <WidgetsRenderer
                    position='actorPageBottom'
                />
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'actorPage'}/>
        </PageStyle>
    )
};

//http://localhost:3000/actor/5f411023b4df305e903613ca
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
            page: 'actor',
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

