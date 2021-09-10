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
    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={props.design?.actorPageStyle || ''}>
            {props.actor ? <PostsPageInfo titleToRender={props.actor?.name}/> : null}
            {props.actor ? <MetaDataToSiteHead title={props.actor?.name} description={props.actor?.description} url={`${router.asPath}`} image={props.actor?.imageUrl}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w => w.data.position === 'actorPageTop')}
                position={'actorPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.actorPageSidebar}
                postElementSize={props.design?.postElementSize}
                postElementStyle={props.design?.postElementStyle}
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
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
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {

    if (!context.query.actorId)return { notFound: true};
    if (!context.query?.actorId?.match(/^[0-9a-fA-F]{24}$/))return { notFound: true};

    const firstLoadData = await getFirstLoadData(context.req, ['actorPageTop', 'actorPageLeftSidebar', 'actorPageBottom', 'actorPageRightSidebar',], 'postsPage')

    const gettingPostsQueries = _getPostsQueryGenerator(context.query, context.query.actorId, true)

    const actorData = context.query.actorId ? await getSingleMeta(context.query.actorId, true) : {}

    const actor = actorData.data ? actorData.data.meta : {}

    const postsData = await getPosts(gettingPostsQueries)

    const postsSource = postsData.data ? postsData.data : []
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'customTranslation'])),
            widgets: firstLoadData?.widgets || [],
            query: context.query,
            isMobile: Boolean(firstLoadData.isMobile),
            postsSource,
            actor,
            referer: firstLoadData.referer
        }
    }
}
export default actorPage;
