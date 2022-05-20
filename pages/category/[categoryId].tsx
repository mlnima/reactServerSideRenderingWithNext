import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsRenderer/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getDefaultPageData} from "@store_toolkit/clientActions/globalStateActions";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import {fetchPosts} from "@store_toolkit/clientReducers/postsReducer";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

let PageStyle = styled.div`
  width: 100%;

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

  ${({categoryPageStyle}: { categoryPageStyle: string }) => categoryPageStyle || ''}
`

const categoryPage = () => {

    const {role, category, categoryPageStyle, sidebar} = useSelector(({user, posts, settings}: StoreTypes) => {
        return {
            role: user?.userData?.role,
            category: posts.categoryData,
            categoryPageStyle: settings.design?.categoryPageStyle,
            sidebar: settings?.identity?.categoryPageSidebar
        }
    })

    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `} categoryPageStyle={categoryPageStyle}>
            <main id={'primary'} className="main posts-page">
                {role === 'administrator' ?
                    <div className='edit-as-admin'>
                        <Link href={'/admin/meta?id=' + category?._id}>
                            <a className={'btn btn-primary'}>
                                Edit
                            </a>
                        </Link>
                    </div>
                    : null}

                {category ? <PostsPageInfo metaData={category}/> : null}

                <WidgetsRenderer
                    position={'categoryPageTop'}
                />
                <PostsPage/>
                <WidgetsRenderer
                    position={'categoryBottom'}
                />
            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'categoryPage'}/>
        </PageStyle>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await getDefaultPageData(
        context,
        [
            'categoryPageTop',
            'categoryPageLeftSidebar',
            'categoryPageBottom',
            'categoryPageRightSidebar'
        ],
        {
            page:'category',
            setHeadData:false
        },
        store
    )

    await store.dispatch(
        fetchPosts({
                context,
                metaId: context?.query?.categoryId as string,
                metaType: 'categories',
                options: {
                    page: 'category',
                    setHeadData:true
                }
            }
        ))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});

categoryPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default categoryPage;

