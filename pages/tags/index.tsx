import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "@_variables/ajaxVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import TagsRenderer from "../../components/includes/pagesComponents/tagsPageComponents/Components/TagsRenderer/TagsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import { StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "@store/store";
import {getMetas} from "@store/clientActions/postsAction";

const TagsPageStyledMain = styled.main`
  grid-area: main;
`
const tagsPage = () => {
    const isWithSidebar = useSelector((store: StoreTypes) => store.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((store: StoreTypes) => store.posts.totalCount)
    const router = useRouter()

    const postsCountPerPage = router.query?.size ? parseInt(router.query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <TagsPageStyledMain className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer position={'tagsPageTop'}/>
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount/ postsCountPerPage)}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <TagsRenderer  postElementSize={undefined} />

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount/ postsCountPerPage)}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer position={'tagsPageBottom'}/>
        </TagsPageStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    await getFirstLoadData(context.req,
        ['tagsPageTop', 'tagsPageLeftSidebar', 'tagsPageBottom', 'tagsPageRightSidebar'],
        store,
        context.locale
    );

    // @ts-ignore
    await  store.dispatch(getMetas(context.query, 'tags', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

});

export default tagsPage;
