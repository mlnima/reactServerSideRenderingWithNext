import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";

let StyledMain = styled.main`
  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  .no-result-message {
    text-align: center;
    color: var(--main-text-color);
  }

  ${props => props.stylesData}
`
const searchPage = props => {

    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={props.design?.postsPageStyle || ''}>
            {router.query.keyword ? <MetaDataToSiteHead title={router.query.keyword} url={`${router.asPath}`}/> : null}

            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'searchPageTop')}
                position={'searchPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.homePageSidebar}
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
            {router.query.keyword ? <PostsPageInfo titleToRender={router.query.keyword}/> : null}


            {props.postsSource.posts.length < 1 ? <h2 className='no-result-message'>No Result for {router.query.keyword}</h2> : null}
            <PostsPage {...props} />
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'searchPageBottom')}
                position={'searchPageBottom'}
                referer={props.referer}
                currentPageSidebar={props.identity?.homePageSidebar}
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {

    const firstLoadData = await getFirstLoadData(context.req, ['searchPageTop', 'searchPageLeftSidebar', 'searchPageBottom', 'searchPageRightSidebar',], 'postsPage');
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, null, true);
    const postsData = await getPosts(gettingPostsQueries);
    const postsSource = postsData.data ? postsData.data : [];

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
            postsSource,
        }
    }
}

export default searchPage;
