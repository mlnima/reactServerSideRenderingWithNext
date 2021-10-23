import React from "react";
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {wrapper} from "../../store/store";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";

import {useSelector} from "react-redux";
import {settingsPropTypes, WidgetsStateInterface} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {SET_POSTS_DATA} from "../../store/types";
import {StoreTypes} from '../../_variables/TypeScriptTypes/GlobalTypes'
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

  ${(props:{stylesData:string}) => props.stylesData || ''}
`
const searchPage = (props: ClientPagesTypes) => {
    const settings = useSelector((state: settingsPropTypes) => state.settings);
    const posts = useSelector((state:StoreTypes) => state.posts.posts)
    const router = useRouter()
    return (
        <StyledMain className="main posts-page" stylesData={settings.design?.postsPageStyle || ''}>
            {router.query.keyword ? <MetaDataToSiteHead title={router.query.keyword} url={`${router.asPath}`}/> : null}

            <WidgetsRenderer
                position={'searchPageTop'}
                referer={props.referer}
            />
            {router.query.keyword ? <PostsPageInfo titleToRender={router.query.keyword}/> : null}


            {
                // @ts-ignore
               posts.length < 1 ?
                    <h2 className='no-result-message'>No Result for {router.query.keyword}</h2> :
                    null
            }
            <PostsPage  />
            <WidgetsRenderer
                position={'searchPageBottom'}
                referer={props.referer}
            />
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const keyword = context.query.keyword
    if (!keyword) return {notFound: true};
    const firstLoadData = await getFirstLoadData(
        context.req,
        ['searchPageTop', 'searchPageLeftSidebar', 'searchPageBottom', 'searchPageRightSidebar'],
        store
    );
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, null, true);
    const postsData = await getPosts(gettingPostsQueries);

    store.dispatch({
        type: SET_POSTS_DATA,
        payload: {
            // @ts-ignore
            posts: postsData.data?.posts || [],
            // @ts-ignore
            totalCount: postsData?.data?.totalCount || 0,
            // @ts-ignore

        }
    })

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
        }
    }
})

export default searchPage;
