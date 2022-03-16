import React, {FC} from "react";
import {getPosts} from "@store/clientActions/postsAction";
import PostsPage from "@components/includes/PostsPage/PostsPage";
import styled from "styled-components";
import PostsPageInfo from "@components/includes/PostsRenderer/PostsPageInfo";
import {useRouter} from "next/router";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import MetaDataToSiteHead from "@components/includes/PostsDataToSiteHead/MetaDataToSiteHead";
import {wrapper} from "@store/store";
import {useSelector} from "react-redux";
import {StoreTypes} from '@_variables/TypeScriptTypes/GlobalTypes'
import {getDefaultPageData} from "@store/clientActions/globalStateActions";

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
const searchPage : FC = ( ) => {
    const settings = useSelector((store: StoreTypes) => store.settings);
    const posts = useSelector((store:StoreTypes) => store.posts.posts)
    const router = useRouter()
    return (
        <StyledMain className="main posts-page" stylesData={settings.design?.postsPageStyle || ''}>
            {router.query.keyword ?
                <MetaDataToSiteHead title={router.query.keyword as string}
                                    url={`${router.asPath}`}/>
                : null
            }

            <WidgetsRenderer
                position={'searchPageTop'}

            />
            {router.query.keyword ? <PostsPageInfo titleToRender={router.query.keyword as string}/> : null}


            {
                // @ts-ignore
               posts.length < 1 ?
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
    // @ts-ignore
    const keyword = context.query.keyword ? encodeURIComponent(context?.query?.keyword) : '';
    if (!keyword) return {notFound: true};
    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'searchPageTop',
            'searchPageLeftSidebar',
            'searchPageBottom',
            'searchPageRightSidebar'
        ]))
    // @ts-ignore
    await store.dispatch(getPosts(context.query, null, true,null))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

export default searchPage;
