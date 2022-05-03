import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import {getPosts} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import AppLayout from "@components/layouts/AppLayout";
import type {ReactElement} from 'react'
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import ActorBio from '../../components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorBio'

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

    const {role, actorPageStyle, sidebar} = useSelector(({user, settings}: StoreTypes) => {
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
                        <Link href={'/admin/meta?id=' + query.actorId}>
                            <a className={'btn btn-primary'}>
                                Edit
                            </a>
                        </Link>
                    </div>
                    : null}

                <ActorBio/>
                <WidgetsRenderer
                    position='actorPageTop'
                />
                <PostsPage/>
                <WidgetsRenderer
                    position='actorPageBottom'
                />
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'actorPage'}/>
        </PageStyle>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await store.dispatch(getDefaultPageData(
        context,
        [
            'actorPageTop',
            'actorPageLeftSidebar',
            'actorPageBottom',
            'actorPageRightSidebar'
        ],
        null,
        store
    ))
//@ts-ignore
    await store.dispatch(getPosts(context, context.query.actorId, true, 'actors', {page: 'actor'}))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});


actorPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default actorPage;

