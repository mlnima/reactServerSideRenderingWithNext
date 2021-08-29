import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getPosts, getSingleMeta} from "../../_variables/ajaxPostsVariables";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
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
const actorPage = props => {
    const contextData = useContext(AppContext);
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.actorPageStyle || contextData.siteDesign?.actorPageStyle || ''}>
            {props.actor ? <PostsPageInfo titleToRender={props.actor?.name}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'actorPageTop')}
                position={'actorPageTop'}
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
                widgets={props.widgets.filter(w => w.data.position === 'actorPageBottom')}
                position={'actorPageBottom'}
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
    if (!context.query.actorId.match(/^[0-9a-fA-F]{24}$/)){
        return {
            notFound: true
        }
    }

    const firstLoadData = await getFirstLoadData(context.req, ['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar',], 'postsPage')

    const gettingPostsQueries = _getPostsQueryGenerator(context.query,firstLoadData?.settings?.identity?.data?.postsCountPerPage,context.query.actorId,true)

    const actorData = context.query.actorId ? await getSingleMeta(context.query.actorId, true) : {}

    const actor = actorData.data ? actorData.data.meta : {}

    const postsData = await getPosts(gettingPostsQueries)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets,
            ...firstLoadData?.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            countPerPage:firstLoadData?.settings?.identity?.data?.postsCountPerPage,
            postsSource,
            actor,
            referer: firstLoadData.referer
        }
    }
}
export default actorPage;
