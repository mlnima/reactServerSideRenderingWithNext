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
import fetchPosts from "../../store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";

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

    const {query} = useRouter()

    const {role, actorPageStyle, sidebar} = useSelector(({user, settings}: Store) => {
        return {
            role: user?.userData.role,
            actorPageStyle: settings?.design?.actorPageStyle,
            sidebar: settings?.identity?.actorPageSidebar
        }
    })

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`} stylesData={actorPageStyle}>
            <main id={'primary'} className="main posts-page">
                {role === 'administrator' ?
                    <div className='edit-as-admin'>
                        <Link href={'/admin/meta?id=' + query.actorId} className={'btn btn-primary'}>
                                Edit
                        </Link>
                    </div>
                    : null}

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
        fetchPosts({
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

