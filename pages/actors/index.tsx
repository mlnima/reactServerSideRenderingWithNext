import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "../../components/includes/PaginationComponent/PaginationComponent";
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getMultipleMeta} from "../../_variables/ajaxPostsVariables";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import ActorsRenderer from "../../components/includes/pagesComponents/actorsPageComponents/Components/ActorsRenderer/ActorsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {settingsPropTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import {wrapper} from "../../store/store";
import {SET_ACTORS_METAS} from "../../store/types";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";

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
    const isWithSidebar = useSelector((state: settingsPropTypes) => state.settings?.identity?.metaPageSidebar);
    const totalCount = useSelector((state: StoreTypes) => state.posts.totalCount)
    const router = useRouter();

    return (
        <ActorsPageStyledDiv className={isWithSidebar ? 'content main ' : 'content main '}>
            <WidgetsRenderer
                position={'actorsPageTop'}
            />
            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || 60}
                // @ts-ignore
                maxPage={Math.ceil(totalCount / parseInt(router.query?.size || 60))}
                queryData={router.query}
                pathnameData={router.pathname}
            />

            <ActorsRenderer metaData={undefined} postElementSize={undefined}/>


            <PaginationComponent
                isActive={true}
                currentPage={router.query?.page || 1}
                totalCount={totalCount}
                // @ts-ignore
                size={parseInt(router.query?.size) || 60}
                // @ts-ignore
                maxPage={Math.ceil(totalCount / parseInt(router.query?.size || 60))}
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
    const firstLoadData = await getFirstLoadData(context.req, ['actorsPageTop', 'actorsPageLeftSidebar', 'actorsPageBottom', 'actorsPageRightSidebar'], store);
    const metaData = await getMultipleMeta(context.query, 'actors', true)

    store.dispatch({
        type: SET_ACTORS_METAS,
        payload: {
            // @ts-ignore
            actorsMetas: metaData.data?.metas || [],
            // @ts-ignore
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


export default actorsPage;