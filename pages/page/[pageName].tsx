import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import dynamic from "next/dynamic";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";
import styled from "styled-components";
import SidebarWidgetAreaRenderer from "@components/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import fetchPageData
    from "@store_toolkit/_storeVariables/_clientAsyncThunks/_clientPostsAsyncThunks/_clientPostsAsyncThunksFetchPageData";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
const Soft404 = dynamic(() => import('@components/includes/Soft404/Soft404'));

const PageStyle = styled.div`
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const page = () => {

    const {pageData, sidebar, notFoundPage} = useSelector(({posts, globalState}: StoreTypes) => {
        return {
            sidebar: posts.pageData?.sidebar,
            pageData: posts.pageData,
            notFoundPage: globalState.notFoundPage
        }
    })

    if (notFoundPage) {
        return <Soft404/>
    } else {
        return (
            <PageStyle id={'content'} className={`page-${sidebar || 'no'}-sidebar`}
                       stylesData={pageData?.pageStyle || ''}>
                <MainWidgetArea position={pageData?.pageName} className='page main'/>
                <SidebarWidgetAreaRenderer sidebar={sidebar} position={pageData?.pageName}/>
            </PageStyle>
        )
    }
}

//************SSR***************
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [
            context.query.pageName as string,
            context.query.pageName + 'LeftSidebar',
            context.query.pageName + 'RightSidebar'
        ],
        {
            page: context.query.pageName,
            setHeadData: false
        },
        store
    )
//@ts-ignore
    await store.dispatch(fetchPageData(context?.query?.pageName as string))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

page.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default page;


//************SSG***************
// export const getStaticPaths = async ({locales}: any) => {
//     try {
//         // Call an external API endpoint to get posts
//         const pagesDataFromApi = await getPagesDataForStaticGeneration()
//         // @ts-ignore
//         const pagesData = pagesDataFromApi.data?.pagesData || []
//
//         let allParams: { params: { pageName: string }, locale: string }[] = []
//
//         if (pagesData.length ) {
//             locales.forEach((locale: string) => {
//                 allParams.push(...pagesData.map((pageData: { pageName: string }) => {
//                     return {params: {pageName: pageData.pageName}, locale}
//                 }))
//             })
//         }
//
//         return {
//             paths: allParams || null,
//             fallback: true
//         }
//
//     } catch (err) {

//     }
//
// }
//
//
// export const getStaticProps = wrapper.getServerSideProps(store =>
//
//     async (context) => {
//         const firstLoadData = await getFirstLoadDataStatic(
//             // @ts-ignore
//             [context.params.pageName, context.params.pageName + 'LeftSidebar', context.params.pageName + 'RightSidebar'],
//             store
//         )
//         // @ts-ignore
//         const pageData = await getPageData({pageName: context.params.pageName})
//         // @ts-ignore
//         if (!pageData.data.pageData) return {notFound: true}
//
//
//         return {
//             props: {
//                 ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
//                 ...firstLoadData,
//                 // @ts-ignore
//                 pageInfo: pageData.data ? pageData.data.pageData : null,
//             }
//         }
//     })




