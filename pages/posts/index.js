import {useContext} from 'react'
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {AppContext} from "../../context/AppContext";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

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
    const getPostsData = {
        size: parseInt(context.query.size) || parseInt(firstLoadData?.settings?.identity?.data?.postsCountPerPage) || 50,
        page: parseInt(context.query?.page) || 1,
        postType: context.query.type || null,
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations', 'videoTrailerUrl', 'rating', 'redirectLink'],
        keyword: context.query.keyword || '',
        author: context.query.author || 'all',
        status: 'published',
        sort: context.query.sort || 'updatedAt',
        lang: context.query.lang || null
    }

    const postsData = await getPosts(getPostsData, process.env.REACT_APP_PRODUCTION_URL, true, context.req.originalUrl)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []

    return {props: {
        widgets,
            ...(await serverSideTranslations(context.locale, ['common'])),
            ...firstLoadData.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            postsSource,
            getPostsData,
            referer: firstLoadData.referer
    }}
}

export default posts;
