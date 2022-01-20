import {
    getFirstLoadData,
    getPageData,
    // getFirstLoadDataStatic,
    // getPagesDataForStaticGeneration
} from "../../_variables/ajaxVariables";
import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";

const page = (props: ClientPagesTypes) => {

    return (
        < MainWidgetArea
            position={props.pageInfo?.pageName}
            className='page main'
            stylesData={props.pageInfo?.pageStyle || ''}
        />
    )
};

//************SSR***************
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    if (!context.query.pageName)   return {notFound: true}
    const firstLoadData = await getFirstLoadData(
        context.req,
        [context.query.pageName, context.query.pageName + 'LeftSidebar',context.query.pageName + 'RightSidebar'],
        store,
        context.locale
    )
    let responseCode = 200
    const pageData = await getPageData({pageName: context.query.pageName})
    // @ts-ignore
    if (!pageData?.data?.pageData)return { notFound: true}


    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData,
            // @ts-ignore
            pageInfo:pageData.data ? pageData?.data?.pageData : {},
            query:context.query,
            responseCode
        }
    }
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
//         console.log(err)
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




