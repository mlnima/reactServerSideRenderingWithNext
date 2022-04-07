import {NextPage} from 'next';
import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {getPosts} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";


let StyledMain = styled.main`
  width: 100%;
  grid-area: main;
  .posts-page-info {
    margin: 5px 0;
    h1 {
      margin: 0;
      padding: 0 10px;
    }
  }
  ${(props: { stylesData: string }) => props.stylesData}
`

const posts: NextPage<any> = props => {
    return (
        <StyledMain className="main posts-page" stylesData={props.design?.postsPageStyle || ''}>
            <PostsPage/>
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'postsPageLeftSidebar',
            'postsPageRightSidebar',
        ],
        {
            setHeadData: true,
            page: 'posts'
        }
    ))

    // @ts-ignore
    await store.dispatch(getPosts(context, null, true,null))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }
});

export default posts;
