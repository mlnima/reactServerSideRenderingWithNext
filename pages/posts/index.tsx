import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import fetchPosts from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPosts";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "@_typeScriptTypes/storeTypes/Store";


let StyledMain = styled.main`
  grid-area: main;

  .posts-page-info {
    margin: 5px 0;

    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({postsPageStyle}: { postsPageStyle: string }) => postsPageStyle || ''}
`

const posts = () => {

    const {postsPageStyle} = useSelector(({settings}: Store) => {
        return {
            postsPageStyle: settings?.design?.postsPageStyle
        }
    })

    return (
        <StyledMain id={'main-content'} className="main posts-page" postsPageStyle={postsPageStyle || ''}>
            <PostsPage renderPagination={true}/>
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'postsPageLeftSidebar',
            'postsPageRightSidebar',
        ],
        {
            setHeadData: true,
            page: 'posts'
        },
        store
    )

    await store.dispatch(
        fetchPosts({
                context,
                metaId: null,
                metaType: null,
                options: {
                    page: 'posts',
                    setHeadData: false
                }
            }
        ))

    return null
});


export default posts;
