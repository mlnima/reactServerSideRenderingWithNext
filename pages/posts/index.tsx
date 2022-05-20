import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import {getDefaultPageData} from "@store_toolkit/clientActions/globalStateActions";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import {fetchPosts} from "@store_toolkit/clientReducers/postsReducer";


let StyledMain = styled.main`
  grid-area: main;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({postsPageStyle}: { postsPageStyle: string }) => postsPageStyle || ''}
`

const posts = () => {

    const {postsPageStyle} = useSelector(({settings}: StoreTypes) => {
        return {
            postsPageStyle: settings?.design?.postsPageStyle
        }
    })

    return (
        <StyledMain id={'main-content'} className="main posts-page" postsPageStyle={postsPageStyle || ''}>
            <PostsPage/>
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    // @ts-ignore
    await getDefaultPageData(
        context,
        [
            'postsPageLeftSidebar',
            'postsPageRightSidebar',
        ],
        {
            setHeadData: true,
            page: 'posts'
        },
        store
    )

    await store.dispatch(
        fetchPosts({
                context,
                metaId: null,
                metaType: null,
                options: {
                    page: 'posts',
                    setHeadData: false
                }
            }
        ))


    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});

posts.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default posts;
