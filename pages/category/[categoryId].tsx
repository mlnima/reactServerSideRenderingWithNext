import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsRenderer/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import Link from "next/link";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getPosts} from "@store/clientActions/postsAction";
import {FC} from "react";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

let StyledMain = styled.main`
  grid-area: main;
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

    const {role, category, categoryPageStyle} = useSelector(({user, posts, settings}: StoreTypes) => {
        return {
            role: user?.userData?.role,
            category: posts.categoryData,
            categoryPageStyle: settings.design?.categoryPageStyle,
        }
    })

    return (
        <StyledMain id={'main-content'} className="main posts-page" categoryPageStyle={categoryPageStyle}>
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
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await store.dispatch(getDefaultPageData(
        context,
        [
            'categoryPageTop',
            'categoryPageLeftSidebar',
            'categoryPageBottom',
            'categoryPageRightSidebar'
        ],
        null,
        store
    ))

    // @ts-ignore
    await store.dispatch(getPosts(context, context.query.categoryId, true, 'categories', {page: 'category'}))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});

categoryPage.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default categoryPage;

