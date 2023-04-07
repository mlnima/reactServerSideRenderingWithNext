import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "../../components/includes/PostsPage/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import getPostsAction from "@store_toolkit/clientReducers/postsReducers/getPostsAction";

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
  ${({customStyles}:{customStyles?:string}) => customStyles || ''}
`

const searchPage = ( ) => {

    const {query} = useRouter()
    const posts = useSelector((store:Store) => store.posts.posts)
    const customStyles = useSelector(({settings}: Store) => settings?.currentPageSettings?.customStyles)

    return (
        <StyledMain id={'content'} className="main posts-page" customStyles={customStyles}>
            <WidgetsRenderer position={'searchPageTop'}/>
            {!!query.keyword && !!posts?.length && <PostsPageInfo titleEntry={query.keyword as string }/>}
            {!posts?.length && <h2 className='no-result-message'>No Result for {query.keyword}</h2>}
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
            page: 'searchPage'
        },
        store
    )

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
