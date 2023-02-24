import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/PostsPage/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostsAction from "@store_toolkit/clientReducers/postsReducer/getPostsAction";

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

const searchPage = ( ) => {

    const settings = useSelector((store: Store) => store.settings);
    const posts = useSelector((store:Store) => store.posts.posts)
    const router = useRouter()

    return (
        <StyledMain id={'content'} className="main posts-page"
                    //@ts-ignore
                    stylesData={settings.design?.postsPageStyle || ''}>

            <WidgetsRenderer position={'searchPageTop'}/>

            {!!router.query.keyword && !!posts?.length &&
                <PostsPageInfo titleEntry={router.query.keyword as string }/>
            }

            {!posts?.length && <h2 className='no-result-message'>No Result for {router.query.keyword}</h2>}

            <PostsPage renderPagination={true}  />

            <WidgetsRenderer position={'searchPageBottom'}/>

        </StyledMain>
    )
};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            'searchPageTop',
            'searchPageLeftSidebar',
            'searchPageBottom',
            'searchPageRightSidebar'
        ],
        {
            setHeadData: false,
            page: 'search'
        },
        store
    )
    // // @ts-ignore
    // await store.dispatch(getPosts(context, null, true,null,null,store))

    await store.dispatch(
        getPostsAction({
                context,
                metaId: null,
                options: {
                    page: 'search',
                    setHeadData:true,
                }
            }
        ))


    return null
})

export default searchPage;
