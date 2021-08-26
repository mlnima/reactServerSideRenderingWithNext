import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

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
const tagPage = props => {
    const contextData = useContext(AppContext);
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            {props.tag ? <PostsPageInfo titleToRender={props.tag.name}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'tagPageTop')}
                position={'tagPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={props.design?.data?.postElementImageLoader || contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={props.design?.data?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader}
            />
            <PostsPage {...props}/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'tagPageBottom')}
                position={'tagPageBottom'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}
                postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={props.design?.data?.postElementImageLoader || contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={props.design?.data?.postElementImageLoaderType || contextData.siteDesign.postElementImageLoader}
            />
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['tagPageTop', 'tagPageLeftSidebar', 'tagPageBottom', 'tagPageRightSidebar',], 'postsPage')
    const getPostsData = {
        size: parseInt(context.query.size) || parseInt(firstLoadData?.settings?.identity?.data?.postsCountPerPage) || 30,
        page: parseInt(context.query?.page) || 1,
        postType: context.query.type || null,
        fields: ['title', 'mainThumbnail', 'quality', 'likes', 'disLikes', 'views', 'duration', 'postType', 'price', 'translations', 'videoTrailerUrl', 'rating', 'redirectLink'],
        keyword: context.query.keyword || '',
        author: context.query.author || 'all',
        status: 'published',
        metaId: context.query.tagId || null,
        sort: context.query.sort || 'updatedAt',
        lang: context.query.lang || null
    }

    const tagData = context.query?.tagId ? await getSingleMeta(context.query.tagId, true) : {}
    const tag = tagData.data ? tagData.data.meta : {}
    const postsData = await getPosts(getPostsData, firstLoadData.domainName, true, context.req.originalUrl)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets,
            ...firstLoadData?.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            postsSource,
            getPostsData,
            tag,
            referer: firstLoadData.referer
    }}
}

export default tagPage;
