import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {getPosts} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";


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
    await store.dispatch(getDefaultPageData(
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
    ))

    // @ts-ignore
    await store.dispatch(getPosts(context, null, true, null))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});

posts.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default posts;
