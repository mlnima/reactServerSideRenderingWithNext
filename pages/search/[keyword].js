import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";

let StyledMain = styled.main`
  width: 100%;
  .posts-page-info{
    margin: 5px 0;
    h1{
      margin:  0;
      padding: 0 10px;
    }
  }
  .no-result-message{
    text-align: center;
    color:var( --main-text-color);
  }
  ${props => props.stylesData}
`
const searchPage = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.data?.postsPageStyle || contextData.siteDesign?.postsPageStyle || ''}>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'searchPageTop' )}
                position={'searchPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.homePageSidebar || contextData.siteIdentity.homePageSidebar}
                postElementSize={props.design?.data?.postElementSize || contextData.siteDesign.postElementSize}

                postElementStyle={props.design?.data?.postElementStyle || contextData.siteDesign.postElementStyle}
                postElementImageLoader={props.design?.data?.postElementImageLoader|| contextData.siteDesign.postElementImageLoader}
                postElementImageLoaderType={props.design?.data?.postElementImageLoaderType|| contextData.siteDesign.postElementImageLoader}
            />
            {router.query.keyword  ? <PostsPageInfo titleToRender={router.query.keyword}/> : null}
            {props.postsSource.posts.length < 1 ? <h2 className='no-result-message'>No Result for {router.query.keyword}</h2>: null}
            <PostsPage {...props}       postElementSize='list'/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'searchPageBottom' )}
                position={'searchPageBottom'}
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
    const firstLoadData = await getFirstLoadData(context.req,['searchPageTop','searchPageLeftSidebar','searchPageBottom','searchPageRightSidebar',],'postsPage')

    const gettingPostsQueries = _getPostsQueryGenerator(context.query,firstLoadData?.settings?.identity?.data?.postsCountPerPage,null,true)

    const postsData = await getPosts(gettingPostsQueries)
    const widgets = firstLoadData.widgets
    const postsSource = postsData.data ? postsData.data : []
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
            widgets,
            ...firstLoadData.settings,
            query:context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            postsSource,
            countPerPage:firstLoadData?.settings?.identity?.data?.postsCountPerPage,
            referer: firstLoadData.referer}}
}

export default searchPage;
