import {useContext} from 'react'
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {AppContext} from "../../context/AppContext";
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
    const contextData = useContext(AppContext);
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            <PostsPage {...props}/>
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {

    const firstLoadData = await getFirstLoadData(context.req, ['postsPageLeftSidebar', 'postsPageRightSidebar'], 'postsPage')
    const widgets = firstLoadData.widgets
    const gettingPostsQueries = _getPostsQueryGenerator(context.query,firstLoadData?.settings?.identity?.data?.postsCountPerPage,null,true)

    const postsData = await getPosts(gettingPostsQueries)
    const postsSource = postsData.data ? postsData.data : []
    return {props: {
        widgets,
            ...(await serverSideTranslations(context.locale, ['common'])),
            ...firstLoadData.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            countPerPage:firstLoadData?.settings?.identity?.data?.postsCountPerPage,
            postsSource,
            referer: firstLoadData.referer
    }}
}

export default posts;
