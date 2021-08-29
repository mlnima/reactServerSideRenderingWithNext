import { getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

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
const categoryPage = props => {
    const contextData = useContext(AppContext);
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            {props.category  ? <PostsPageInfo titleToRender={props.category?.name}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'categoryPageTop' )}
                position={'categoryPageTop'}
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
                widgets={props.widgets.filter(w=>w.data.position === 'categoryBottom' )}
                position={'categoryBottom'}
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

export const getServerSideProps = async (context) => {
    if (!context.query.categoryId.match(/^[0-9a-fA-F]{24}$/)){
        return {
            notFound: true
        }
    }
    const firstLoadData = await getFirstLoadData(context.req,['categoryPageTop','categoryPageLeftSidebar','categoryPageBottom','categoryPageRightSidebar'],'postsPage')
    const categoryData = context.query.categoryId ? await getSingleMeta(context.query.categoryId, true) : {}

    if (!categoryData) {
        return {
            notFound: true
        }
    }

    const gettingPostsQueries = _getPostsQueryGenerator(context.query,firstLoadData?.settings?.identity?.data?.postsCountPerPage,context.query.categoryId,true)

    const category = categoryData.data ? categoryData.data.meta : {}
    const postsData = await getPosts(gettingPostsQueries)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets,
            ...firstLoadData?.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            countPerPage:firstLoadData?.settings?.identity?.data?.postsCountPerPage,
            postsSource,
            category,
            referer: firstLoadData.referer}}
}

export default categoryPage;
