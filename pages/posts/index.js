import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";

let StyledMain = styled.main`
  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${props => props.stylesData}
`

const posts = props => {

    return (
        <StyledMain className="main posts-page" stylesData={props.design?.postsPageStyle ||  ''}>
            <PostsPage {...props}/>
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {

    const firstLoadData = await getFirstLoadData(context.req, ['postsPageLeftSidebar', 'postsPageRightSidebar'], 'postsPage')
    const gettingPostsQueries = _getPostsQueryGenerator(context.query,null,true)
    const postsData = await getPosts(gettingPostsQueries)
    const postsSource = postsData.data ? postsData.data : []

    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            ...firstLoadData,
            query:context.query,
            postsSource,
    }}
}

export default posts;
