import React from 'react';
import {useRouter} from "next/router";
import PaginationComponent from "@components/includes/PaginationComponent/PaginationComponent";
import CategoriesRenderer
    from "../../components/includes/pagesComponents/categoriesPageComponents/Components/CategoriesRenderer/CategoriesRenderer";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getMetas} from "@store/clientActions/postsAction";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import {wrapper} from "@store/store";
import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";

const WidgetsRenderer = dynamic(() => import('../../components/includes/WidgetsRenderer/WidgetsRenderer'))

const PageStyle = styled.div`
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const categoriesPage = () => {
    const {query} = useRouter()

    const {
        categoriesPageStyle,
        topWidgets,
        bottomWidgets,
        totalCount,
        postsCountPerPage,
        sidebar
    } = useSelector(({settings, posts, widgets}: StoreTypes) => {
        return {
            categoriesPageStyle: settings?.design?.categoriesPageStyle,
            sidebar: settings?.identity?.categoriesPageSidebar,
            totalCount: posts.totalCount,
            //@ts-ignore
            topWidgets: widgets?.widgetInGroups?.categoriesPageTop?.length,
            //@ts-ignore
            bottomWidgets: widgets?.widgetInGroups?.categoriesPageBottom?.length,
            postsCountPerPage: query?.size ? parseInt(query?.size as string) :
                parseInt(settings?.identity?.postsCountPerPage || '20')
        }
    })


    return (
        <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar `}
                   stylesData={categoriesPageStyle}>
            <main id={'primary'} className={'content main '}>
                {topWidgets ? <WidgetsRenderer position={'categoriesPageTop'}/> : null}
                <CategoriesRenderer cardWidthDesktop={undefined}/>
                <PaginationComponent
                    isActive={true}
                    currentPage={query?.page ? parseInt(query?.page as string) : 1}
                    totalCount={totalCount}
                    size={postsCountPerPage}
                    maxPage={Math.ceil(totalCount / postsCountPerPage)}
                />
                {bottomWidgets ? <WidgetsRenderer position={'categoriesPageBottom'}/> : null}

            </main>
            <SidebarWidgetAreaRenderer sidebar={sidebar} position={'categoriesPage'}/>
        </PageStyle>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'categoriesPageTop',
            'categoriesPageLeftSidebar',
            'categoriesPageBottom',
            'categoriesPageRightSidebar'
        ],
        {
            setHeadData: true,
            page: 'categories'
        },
        store
    ))
    // @ts-ignore
    await store.dispatch(getMetas(context.query, 'categories', true))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation']))
        }
    }

});

categoriesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default categoriesPage;
