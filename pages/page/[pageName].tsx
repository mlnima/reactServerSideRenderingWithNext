import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {getPageData} from "@store/clientActions/postsAction";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import dynamic from "next/dynamic";
const Soft404 = dynamic(() => import('@components/includes/Soft404/Soft404'));
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";

const page = () => {

    const pageData = useSelector(({posts}: StoreTypes) => {
        return posts.pageData
    })

    if (pageData?.pageName){
        return (
            <MainWidgetArea position={pageData?.pageName} className='page main' stylesData={pageData?.pageStyle || ''}/>
        )
    }else return <Soft404/>

}

//************SSR***************
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await store.dispatch(getDefaultPageData(
        context,
        [
            context.query.pageName as string,
            context.query.pageName + 'LeftSidebar',
            context.query.pageName + 'RightSidebar'
        ],
        null ,
        store
    ))

    await store.dispatch(getPageData(context.query.pageName))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

page.getLayout = function getLayout(page:ReactElement) {
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




