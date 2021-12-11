import React from "react";
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))
import {useRouter} from "next/router";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";
import {useSelector} from "react-redux";
import {settingsPropTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {SET_POSTS_DATA} from "../../store/types";

let StyledMain = styled.main`
  grid-area: main;
  width: 100%;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${(props: { stylesData: string }) => props.stylesData || ''}
`
const tagPage = (props: ClientPagesTypes) => {
    // @ts-ignore
    const tag = useSelector((store: settingsPropTypes) => store.posts.tagData)
    const settings = useSelector((store: settingsPropTypes) => store.settings);

    const router = useRouter()
    return (
        <StyledMain className="main posts-page" stylesData={settings.design?.postsPageStyle || ''}>
            {tag ? <PostsPageInfo titleToRender={tag.name}/> : null}
            {tag ? <MetaDataToSiteHead title={tag?.name} description={tag?.description} url={`${router.asPath}`} image={tag?.imageUrl}/> : null}

            <WidgetsRenderer
                position={'tagPageTop'}

            />
            <PostsPage/>
            <WidgetsRenderer
                position={'tagPageBottom'}

            />
        </StyledMain>
    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const tagId = context.query.tagId as string;
    if (!tagId) return {notFound: true};
    if (!tagId.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};
    const firstLoadData = await getFirstLoadData(
        context.req,
        ['tagPageTop', 'tagPageLeftSidebar', 'tagPageBottom', 'tagPageRightSidebar'],
        store,
        context.locale
    );
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, context.query.tagId, true);
    const postsData = await getPosts(gettingPostsQueries)

    // @ts-ignore

    if (tagId && !postsData?.data?.meta || !postsData?.data.posts) return {notFound: true};

    store.dispatch({
        type: SET_POSTS_DATA,
        payload: {
            // @ts-ignore
            posts: postsData.data?.posts || [],
            // @ts-ignore
            totalCount: postsData?.data?.totalCount || 0,
            // @ts-ignore
            tagData: postsData?.data?.meta || {},
        }
    })
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
        }
    }

});

export default tagPage;
