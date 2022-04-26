import {useRouter} from "next/router";
import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import WidgetsRenderer from "../../components/includes/WidgetsRenderer/WidgetsRenderer";
import ActorsRenderer from "../../components/includes/pagesComponents/actorsPageComponents/Components/ActorsRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {wrapper} from "@store/store";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getMetas} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import AppLayout from "@components/layouts/AppLayout";
import type { ReactElement } from 'react'

const ActorsPageStyledDiv = styled.div`
  grid-area: main;

  .actors {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
  ${({actorsPageStyle}: { actorsPageStyle: string }) => actorsPageStyle || ''}
`

const actorsPage = () => {
    const {query} = useRouter();

    const {actorsPageStyle,totalCount} = useSelector(({settings,posts}: StoreTypes) =>{
        return{
            actorsPageStyle:settings?.design?.actorsPageStyle,
            totalCount:posts?.totalCount,
        }
    })

    const postsCountPerPage = query?.size ? parseInt(query?.size as string) :
        useSelector((store: StoreTypes) => parseInt(store?.settings?.identity?.postsCountPerPage || '20'))

    return (
        <ActorsPageStyledDiv id={'main-content'} className={'content main '} actorsPageStyle={actorsPageStyle}>
            <WidgetsRenderer
                position={'actorsPageTop'}
            />
            <ActorsRenderer/>
            <PaginationComponent
                isActive={true}
                currentPage={query?.page ? parseInt(query?.page as string) : 1}
                totalCount={totalCount}
                size={postsCountPerPage}
                maxPage={Math.ceil(totalCount / postsCountPerPage)}
            />
            <WidgetsRenderer
                position={'actorsPageBottom'}

            />
        </ActorsPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'actorsPageTop',
            'actorsPageLeftSidebar',
            'actorsPageBottom',
            'actorsPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'actors'
        },
        store
    ))
    // @ts-ignore
    await store.dispatch(getMetas(context.query, 'actors', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }

});


actorsPage.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}


export default actorsPage;
