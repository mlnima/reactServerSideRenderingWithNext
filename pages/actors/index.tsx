import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "@_variables/ajaxVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import ActorsRenderer from "../../components/includes/pagesComponents/actorsPageComponents/Components/ActorsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store/store";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getMetas} from "@store/clientActions/postsAction";

const ActorsPageStyledDiv = styled.div`
  grid-area: main;
  .actors {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
`
const actorsPage = () => {

    const isWithSidebar = useSelector((store: StoreTypes) => store.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((store: StoreTypes) => store?.posts?.totalCount)
    const router = useRouter();

    const postsCountPerPage = router.query?.size ? parseInt(router.query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <ActorsPageStyledDiv className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer
                position={'actorsPageTop'}
            />
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
                queryData={router.query}
                pathnameData={router.pathname}
            />

            <ActorsRenderer/>

            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount /postsCountPerPage)}
                queryData={router.query}
                pathnameData={router.pathname}
            />
            <WidgetsRenderer
                position={'actorsPageBottom'}

            />
        </ActorsPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    await getFirstLoadData(
        context.req,
        ['actorsPageTop', 'actorsPageLeftSidebar', 'actorsPageBottom', 'actorsPageRightSidebar'],
        store,
        context.locale
    );

    // @ts-ignore
    await store.dispatch(getMetas(context.query, 'actors', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

});


export default actorsPage;
