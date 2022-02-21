import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import TagsRenderer from "../../components/includes/pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "../../store/store";
import {SET_TAGS_METAS} from "../../store/types";

const TagsPageStyledMain = styled.main`
  grid-area: main;
`
const tagsPage = () => {
    const isWithSidebar = useSelector((store: StoreTypes) => store.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((store: StoreTypes) => store.posts.totalCount)
    const router = useRouter()

    return (
        <TagsPageStyledMain className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer position={'tagsPageTop'}/>
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 20}
                // @ts-ignore
                maxPage={Math.ceil(totalCount/ parseInt(router.query?.size || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 20))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <TagsRenderer  postElementSize={undefined} />

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 20}
                // @ts-ignore
                maxPage={Math.ceil(totalCount/ parseInt(router.query?.size || process.env.NEXT_PUBLIC_SETTING_POSTS_COUNT_PER_PAGE || 20))}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer position={'tagsPageBottom'}/>
        </TagsPageStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req,
        ['tagsPageTop', 'tagsPageLeftSidebar', 'tagsPageBottom', 'tagsPageRightSidebar'],
        store,
        context.locale
    );
    const metaData = await getMultipleMeta(context.query, 'tags', true)

    store.dispatch({
        type: SET_TAGS_METAS,
        payload: {
            tagsMetas: metaData.data?.metas || [],
            totalCount: metaData.data?.totalCount || 0,
        }
    })

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
        }
    }

});

export default tagsPage;
