import { getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {useRouter} from "next/router";

let StyledMain = styled.main`
  width: 100%;
  .posts-page-info{
    margin: 5px 0;
    h1{
      margin:  0;
      padding: 0 10px;
    }
  }
  ${props => props.stylesData}
`
const searchPage = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            {router.query.keyword  ? <PostsPageInfo titleToRender={router.query.keyword}/> : null}
            <PostsPage {...props}/>
        </StyledMain>
    )
};

export const getServerSideProps = async ({req, query}) => {
    const firstLoadData = await getFirstLoadData(req,['postsPageLeftSidebar', 'postsPageRightSidebar'],'postsPage')
    const getPostsData = {
        size: parseInt(query.size) || parseInt(firstLoadData.settings?.identity?.data?.postsCountPerPage) || 30,
        page: parseInt(query?.page) || 1,
        postType: query.type || null,
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations', 'videoTrailerUrl', 'rating' , 'redirectLink'],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: 'published',
        sort: query.sort || 'updatedAt',
        lang: query.lang || null
    }

    const postsData = await getPosts(getPostsData, firstLoadData.domainName, true, req.originalUrl)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {props: {widgets, ...firstLoadData.settings, query, isMobile: Boolean(firstLoadData.isMobile), postsSource, getPostsData , referer: firstLoadData.referer}}
}

export default searchPage;
