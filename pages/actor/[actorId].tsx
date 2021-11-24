import React, {useEffect} from 'react';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getPosts} from "../../_variables/ajaxPostsVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {useRouter} from "next/router";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {SET_POSTS_DATA} from "../../store/types";
import ActorBio from '../../components/includes/pagesComponents/actorsPageComponents/Components/ActorBio/ActorBio'

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

const StyledMain = styled.main`
  
  grid-area: main;
  width: 100%;
  height: 100%;
  .posts-page-info {
    margin: 5px 0;
    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }
  ${(props: { stylesData: string }) => props.stylesData || ''}
  
`

const actorPage = (props: ClientPagesTypes) => {

    const actor = useSelector((store: StoreTypes) => store.posts.actorData)
    const settings = useSelector((store: StoreTypes) => store.settings);
    const router = useRouter()

    return (

        <StyledMain className="main posts-page" stylesData={settings.design?.actorPageStyle || ''}>
            <ActorBio/>
            {actor ? <MetaDataToSiteHead title={actor.name} description={actor.description} url={`${router.asPath}`} image={actor.imageUrl}/> : null}
            <WidgetsRenderer
                position='actorPageTop'
                referer={props.referer}
            />
            <PostsPage/>
            <WidgetsRenderer
                position='actorPageBottom'
                referer={props.referer}
            />
        </StyledMain>

    )
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const actorId = context.query.actorId as string
    if (!actorId) return {notFound: true};
    if (!actorId.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};
    const firstLoadData = await getFirstLoadData(
        context.req,
        ['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar'],
        store,
        context.locale
    );
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, context.query.actorId, true);
    const postsData = await getPosts(gettingPostsQueries);

    // @ts-ignore
    if (actorId && !postsData?.data?.meta || !postsData?.data.posts) return {notFound: true};

    store.dispatch({
        type: SET_POSTS_DATA,
        payload: {
            // @ts-ignore
            posts: postsData.data?.posts || [],
            // @ts-ignore
            totalCount: postsData?.data?.totalCount || 0,
            // @ts-ignore
            actorData: postsData?.data?.meta || {},
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


export default actorPage;
