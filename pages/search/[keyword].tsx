import {getPosts} from "@store/clientActions/postsAction";
import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsRenderer/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from '@_variables/TypeScriptTypes/GlobalTypes'
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";

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

    const settings = useSelector((store: StoreTypes) => store.settings);
    const posts = useSelector((store:StoreTypes) => store.posts.posts)
    const router = useRouter()

    return (
        <StyledMain id={'main-content'} className="main posts-page" stylesData={settings.design?.postsPageStyle || ''}>

            <WidgetsRenderer
                position={'searchPageTop'}

            />

            {router.query.keyword && posts?.length && <PostsPageInfo keyword={router.query.keyword as string}/>}

            {!posts?.length ?
                    <h2 className='no-result-message'>No Result for {router.query.keyword}</h2> :
                    null
            }
            <PostsPage  />
            <WidgetsRenderer
                position={'searchPageBottom'}
            />
        </StyledMain>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await store.dispatch(getDefaultPageData(
        context,
        [
            'searchPageTop',
            'searchPageLeftSidebar',
            'searchPageBottom',
            'searchPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'search'
        },
        store
    ))
    // @ts-ignore
    await store.dispatch(getPosts(context, null, true,null))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

searchPage.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default searchPage;
