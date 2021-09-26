import React from 'react';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getPosts, getSingleMeta} from "../../_variables/ajaxPostsVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {ClientPagesTypes,_FirstLoadData} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {GetServerSidePropsContext} from "../../_variables/TypeScriptTypes/GlobalTypes";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

const StyledMain = styled.main`
  grid-area: main;
  width: 100%;

  .posts-page-info {
    margin: 5px 0;
    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${(props:{stylesData:string}) => props.stylesData || ''}
`

const actorPage = (props: ClientPagesTypes) => {
    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={props.design?.actorPageStyle || ''}>
            {props.actor ? <PostsPageInfo titleToRender={props.actor?.name}/> : null}
            {props.actor ? <MetaDataToSiteHead title={props.actor?.name} description={props.actor?.description} url={`${router.asPath}`} image={props.actor?.imageUrl}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'actorPageTop')}
                position='actorPageTop'
                referer={props.referer}
                currentPageSidebar={props.identity?.actorPageSidebar}
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType} homePageSidebar={false} _id={''}            />
            <PostsPage {...props}/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'actorPageBottom')}
                position={'actorPageBottom'}
                referer={props.referer}
                currentPageSidebar={props.identity?.actorPageSidebar}
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType} homePageSidebar={false} _id={''}            />
        </StyledMain>
    )
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext) => {

    // @ts-ignore
    if (!context.query.actorId) return {notFound: true};
    if (!context.query?.actorId?.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};

    const firstLoadData  = await getFirstLoadData(context.req, ['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar',])
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, context.query.actorId, true)
    const actorData : any = context.query.actorId ? await getSingleMeta(context.query.actorId, true) : {}
    const actor = actorData?.data ? actorData.data.meta : {}
    const postsData = await getPosts(gettingPostsQueries)
    const postsSource = postsData.data ? postsData.data : []

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
            postsSource,
            actor,
        }
    }
}
export default actorPage;
