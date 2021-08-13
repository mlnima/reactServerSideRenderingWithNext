import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getPosts, getSingleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";

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
const actorPage = props => {
    const contextData = useContext(AppContext);
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            {props.tag  ? <PostsPageInfo titleToRender={props.tag.name}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'actorPageTop' )}
                position={'actorPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
            <PostsPage {...props}/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'actorPageBottom' )}
                position={'actorPageBottom'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
        </StyledMain>
    )
};

export const getServerSideProps = async ({req, query}) => {
    const firstLoadData = await getFirstLoadData(req,['actorPageTop','actorPageLeftSidebar','actorPageBottom','actorPageRightSidebar',],'postsPage')
    const getPostsData = {
        size: parseInt(query.size) || parseInt(firstLoadData?.settings?.identity?.data?.postsCountPerPage) || 30,
        page: parseInt(query?.page) || 1,
        postType: query.type || null,
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations', 'videoTrailerUrl', 'rating' , 'redirectLink'],
        keyword: query.keyword || '',
        author: query.author || 'all',
        status: 'published',
        metaId: query.actorId || null,
        sort: query.sort || 'updatedAt',
        lang: query.lang || null
    }

    const actorData = query.actorId ? await getSingleMeta(query.actorId, true) : {}
    const actor = actorData.data ? actorData.data.meta : {}
    const postsData = await getPosts(getPostsData, firstLoadData.domainName, true, req.originalUrl)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {props: {widgets, ...firstLoadData?.settings, query, isMobile: Boolean(firstLoadData.isMobile), postsSource, getPostsData, actor, referer: firstLoadData.referer}}
}
export default actorPage;
