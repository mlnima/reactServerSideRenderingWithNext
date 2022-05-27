import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsRenderer/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import Link from "next/link";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import {fetchPosts} from "@store_toolkit/clientReducers/postsReducer";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";

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

    const {role, tag, tagPageStyle, sidebar} = useSelector(({user, posts, settings}: StoreTypes) => {
        return {
            role: user?.userData?.role,
            tag: posts.tagData,
            tagPageStyle: settings.design?.tagPageStyle,
            sidebar: settings?.identity?.tagPageSidebar
        }
    })

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} tagPageStyle={tagPageStyle}>
            <main id={'primary'} className="main posts-page">
                {role === 'administrator' ?
                    <div className='edit-as-admin'>
                        <Link href={'/admin/meta?id=' + tag._id}>
                            <a className={'btn btn-primary'}>
                                Edit
                            </a>
                        </Link>
                    </div>
                    : null}
                {tag ? <PostsPageInfo metaData={tag}/> : null}


                <WidgetsRenderer
                    position={'tagPageTop'}
                />
                <PostsPage/>
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
        fetchPosts({
                context,
                metaId: context?.query?.tagId as string,
                metaType: 'tags',
                options: {
                    page: 'tag',
                    setHeadData:true
                }
            }
        ))


    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
});

tagPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default tagPage;

