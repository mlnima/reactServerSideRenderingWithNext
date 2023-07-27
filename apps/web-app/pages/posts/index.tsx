import PostsPage from "../../components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import getPostsAction from "@store_toolkit/clientReducers/postsReducers/getPostsAction";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import {useAppSelector} from "@store_toolkit/hooks";

interface IStyles{
    customStyles?: string
}

let StyledMain = styled.main<IStyles>`
  grid-area: main;
  .posts-page-info {
    margin: 5px 0;
    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }

  ${({customStyles}) => customStyles || ''}
`

const posts = () => {

    const customStyles = useAppSelector(({settings}) => settings?.currentPageSettings?.customStyles)

    return (
        <StyledMain id={'content'} className="main posts-page" customStyles={customStyles}>
            <HeadSetter/>
            <PostsPage renderPagination={true}/>
        </StyledMain>
    )
};



export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    await _getServerSideStaticPageData(
        context,
        [
            'postsPageLeftSidebar',
            'postsPageRightSidebar',
        ],
        {
            setHeadData: true,
            page: 'postsPage'
        },
        store
    )

    await store.dispatch(
        getPostsAction({
                context,
                metaId: null,
                options: {
                    page: 'posts',
                    setHeadData: false
                }
            }
        ))

    return {
        props: {}
    }
});


export default posts;
