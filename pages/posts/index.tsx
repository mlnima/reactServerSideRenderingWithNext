import {NextPage} from 'next';
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import {wrapper} from "../../store/store";
import {SET_POSTS_DATA} from "../../store/types";

let StyledMain = styled.main`
  width: 100%;
  grid-area: main;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  // @ts-ignore
  ${(props: { stylesData: string }) => props.stylesData}
`

const posts: NextPage<any> = props => {
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.postsPageStyle || ''}>
            <PostsPage/>
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(
        context.req,
        ['postsPageLeftSidebar', 'postsPageRightSidebar'],
        store,
        context.locale
    )
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, null, true)
    const postsData = await getPosts(gettingPostsQueries)
    store.dispatch({
        type: SET_POSTS_DATA,
        payload: {
            // @ts-ignore
            posts: postsData.data?.posts || [],
            // @ts-ignore
            totalCount: postsData?.data?.totalCount || 0,
            // @ts-ignore

        }
    })
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
        }
    }

});


export default posts;

// @ts-ignore