import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import React, {useContext} from "react";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))
import {useRouter} from "next/router";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";

let StyledMain = styled.main`
  grid-area:main;
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
    const router = useRouter()
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.postsPageStyle  || ''}>
            {props.tag ? <PostsPageInfo titleToRender={props.tag.name}/> : null}
            {props.tag ? <MetaDataToSiteHead title={props.tag?.name} description={props.tag?.description} url={`${router.asPath}`} image={props.tag?.imageUrl}/> : null}

            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'tagPageTop')}
                position={'tagPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.tagPageSidebar }
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
            <PostsPage {...props}/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'tagPageBottom')}
                position={'tagPageBottom'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.tagPageSidebar }
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {
    if (!context.query.tagId)return { notFound: true};
    if (!context.query?.tagId?.match(/^[0-9a-fA-F]{24}$/))return { notFound: true};

    const firstLoadData = await getFirstLoadData(context.req, ['tagPageTop', 'tagPageLeftSidebar', 'tagPageBottom', 'tagPageRightSidebar',], 'postsPage');
    const tagData = context.query?.tagId ? await getSingleMeta(context.query.tagId, true) : {};
    const gettingPostsQueries = _getPostsQueryGenerator(context.query,context.query.tagId,true);
    const tag = tagData.data ? tagData.data.meta : {};
    const postsData = await getPosts(gettingPostsQueries);
    const postsSource = postsData.data ? postsData.data : [];

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
            postsSource,
            tag,
        }
    }
}

export default tagPage;
