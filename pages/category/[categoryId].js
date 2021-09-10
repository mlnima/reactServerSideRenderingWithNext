import { getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts, getSingleMeta} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))
import {useRouter} from "next/router";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";

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
    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={props.design?.postsPageStyle  || ''}>
            {props.category  ? <PostsPageInfo titleToRender={props.category?.name}/> : null}
            {props.category ? <MetaDataToSiteHead title={props.category?.name} description={props.category?.description} url={`${router.asPath}`} image={props.category?.imageUrl}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'categoryPageTop' )}
                position={'categoryPageTop'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.categoryPageSidebar}
                postElementSize={props.design?.postElementSize }
                postElementStyle={props.design?.postElementStyle }
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
            <PostsPage {...props}/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                widgets={props.widgets.filter(w=>w.data.position === 'categoryBottom' )}
                position={'categoryBottom'}
                referer={props.referer}
                currentPageSidebar={props.identity?.data?.categoryPageSidebar}
                postElementSize={props.design?.postElementSize }
                postElementStyle={props.design?.postElementStyle }
                postElementImageLoader={props.design?.postElementImageLoader}
                postElementImageLoaderType={props.design?.postElementImageLoaderType}
            />
        </StyledMain>
    )
};

export const getServerSideProps = async (context) => {
    if (!context.query.categoryId)return { notFound: true};
    if (!context.query?.categoryId?.match(/^[0-9a-fA-F]{24}$/))return { notFound: true};

    const firstLoadData = await getFirstLoadData(context.req,['categoryPageTop','categoryPageLeftSidebar','categoryPageBottom','categoryPageRightSidebar'],'postsPage')
    const categoryData = context.query.categoryId ? await getSingleMeta(context.query.categoryId, true) : {}

    if (!categoryData) {
        return {
            notFound: true
        }
    }

    const gettingPostsQueries = _getPostsQueryGenerator(context.query,context.query.categoryId,true)

    const category = categoryData.data ? categoryData.data.meta : {}
    const postsData = await getPosts(gettingPostsQueries)
    const postsSource = postsData.data ? postsData.data : []
    return {props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets:firstLoadData?.widgets || [],
            query:context.query || {},
            isMobile: Boolean(firstLoadData.isMobile) || false,
            postsSource,
            category:category || null,
            referer: firstLoadData.referer}}
}

export default categoryPage;
