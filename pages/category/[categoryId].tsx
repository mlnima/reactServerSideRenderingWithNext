import {getFirstLoadData} from '../../_variables/ajaxVariables';
import {getPosts} from '../../_variables/ajaxPostsVariables';
import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/Posts/PostsPageInfo";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import _getPostsQueryGenerator from "../../_variables/clientVariables/_getPostsQueryGenerator";
import Link from "next/link";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))
import {useRouter} from "next/router";
import MetaDataToSiteHead from "../../components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {wrapper} from "../../store/store";
import {useSelector} from "react-redux";
import {settingsPropTypes, StoreTypes, WidgetsStateInterface} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {SET_POSTS_DATA} from "../../store/types";

let StyledMain = styled.main`
  grid-area: main;
  width: 100%;
  
  .edit-as-admin{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${(props: { stylesData: string }) => props.stylesData}
`
const categoryPage = (props: ClientPagesTypes) => {
    // @ts-ignore
    const userData = useSelector((store :StoreTypes) => store?.user?.userData)
    const category = useSelector((store: StoreTypes) => store.posts.categoryData)
    const categoryPageStyle = useSelector((store: StoreTypes) => store.settings.design?.categoryPageStyle || '');
    const router = useRouter()

    return (
        <StyledMain className="main posts-page" stylesData={categoryPageStyle}>
            {userData?.role === 'administrator' ?
                <div className='edit-as-admin'>
                    <Link href={'/admin/meta?id=' + router.query.categoryId}>
                        <a className={'btn btn-primary'} >
                            Edit
                        </a>
                    </Link>
                </div>
                :null}
            {category ? <PostsPageInfo titleToRender={category?.name}/> : null}
            {category ? <MetaDataToSiteHead title={category?.name} description={category?.description} url={`${router.asPath}`} image={category?.imageUrl}/> : null}
            <WidgetsRenderer
                position={'categoryPageTop'}
            />
            <PostsPage/>
            <WidgetsRenderer
                position={'categoryBottom'}
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
        store,
        context.locale
    );

    const gettingPostsQueries = _getPostsQueryGenerator(context.query, context.query.categoryId, true)
    const postsData = await getPosts(gettingPostsQueries)

    // @ts-ignore
    if (categoryId && !postsData?.data?.meta || !postsData?.data.posts) return {notFound: true};

    store.dispatch({
        type: SET_POSTS_DATA,
        payload: {
            // @ts-ignore
            posts: postsData?.data?.posts || [],
            // @ts-ignore
            totalCount: postsData?.data?.totalCount || 0,
            // @ts-ignore
            categoryData: postsData?.data?.meta || {},
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
