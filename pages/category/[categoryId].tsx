import {getFirstLoadData} from '../../_variables/ajaxVariables';
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
import {wrapper} from "../../store/store";
import {useSelector} from "react-redux";
import {settingsPropTypes, WidgetsStateInterface} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
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

  ${(props:{stylesData:string}) => props.stylesData}
`
const categoryPage = (props: ClientPagesTypes) => {
    // @ts-ignore
    const category = useSelector(state => state.posts.categoryData)
    const settings = useSelector((state : settingsPropTypes) => state.settings);

    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={settings.design?.postsPageStyle || ''}>
            {category ? <PostsPageInfo titleToRender={category?.name}/> : null}
            {category ? <MetaDataToSiteHead title={category?.name} description={category?.description} url={`${router.asPath}`} image={category?.imageUrl}/> : null}
            <WidgetsRenderer
                isMobile={props.isMobile}
                position={'categoryPageTop'}
                referer={props.referer}
            />
            <PostsPage {...props}/>
            <WidgetsRenderer
                isMobile={props.isMobile}
                position={'categoryBottom'}
                referer={props.referer}
            />
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const categoryId = context.query.categoryId as string
    if (!categoryId) return {notFound: true};
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) return {notFound: true};

    const firstLoadData = await getFirstLoadData(
        context.req,
        ['categoryPageTop', 'categoryPageLeftSidebar', 'categoryPageBottom', 'categoryPageRightSidebar'],
        store
    );

    const categoryData = categoryId ? await getSingleMeta(categoryId, true) : {}
    const gettingPostsQueries = _getPostsQueryGenerator(context.query, context.query.categoryId, true)

    const postsData = await getPosts(gettingPostsQueries)


    store.dispatch({
        type: SET_POSTS_DATA,
        payload: {
            posts: postsData.data?.posts || [],
            totalCount: postsData?.data?.totalCount || 0,
            // @ts-ignore
            categoryData: categoryData?.data?.meta || {},
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

export default categoryPage;
