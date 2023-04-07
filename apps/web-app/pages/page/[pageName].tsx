import React from "react";
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import dynamic from "next/dynamic";
import styled from "styled-components";
import getPageDataAction
    from "@store_toolkit/clientReducers/postsReducers/getPageDataAction";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import SidebarWidgetAreaRenderer from "@components/RootLayout/widgetsArea/SidebarWidgetArea/SidebarWidgetAreaRenderer";
import MainWidgetArea from "@components/RootLayout/widgetsArea/MainWidgetArea";

const Soft404 = dynamic(() => import('../../components/includes/Soft404/Soft404'));


const PageStyle = styled.div`
  ${({stylesData}: { stylesData: string }) => stylesData || ''}
`

const page = () => {

    const {pageData, sidebar, notFoundPage} = useSelector(({posts, globalState}: Store) => {
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
                <HeadSetter title={pageData?.title} description={pageData?.description}/>
                <MainWidgetArea position={pageData?.pageName} className='page main'/>
                <SidebarWidgetAreaRenderer sidebar={sidebar} position={pageData?.pageName}/>
            </PageStyle>
        )
    }
}

//@ts-ignore
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
    await store.dispatch(getPageDataAction(context))

    return null
})

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




