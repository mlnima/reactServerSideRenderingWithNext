import {getFirstLoadData, getFirstLoadDataStatic, getPageData, getPagesDataForStaticGeneration} from "../../_variables/ajaxVariables";
import MainWidgetArea from "../../components/widgetsArea/MainWidgetArea/MainWidgetArea";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";

const page = (props: ClientPagesTypes) => {

    return (
        < MainWidgetArea
            position={props.pageInfo?.pageName}
            rendering={true}
            className='page main'
            stylesData={props.pageInfo?.pageStyle || ''}
        />
    )
};

export const getStaticPaths = async ({locales}:any) => {
    try {
        // Call an external API endpoint to get posts
        const pagesDataFromApi = await getPagesDataForStaticGeneration()
        const pagesData = pagesDataFromApi.data?.pagesData || []
        let allParams : {params:{pageName:string,locale:string}}[] = []

        locales.forEach((locale:string)=>{

            allParams.push(...pagesData.map((pageData:{pageName:string})=> {
                return {params: {pageName: pageData.pageName, locale}}
            }))
        })

        return {
            paths: allParams,
            fallback: true
        }

    }catch (error){
        console.log(error)
    }

}


export const getStaticProps = wrapper.getServerSideProps(store =>

    async (context) => {
        const firstLoadData = await getFirstLoadDataStatic(
            // @ts-ignore
            [context.params.pageName, context.params.pageName + 'LeftSidebar', context.params.pageName + 'RightSidebar'],
            store
        )
        // @ts-ignore
        const pageData = await getPageData({pageName: context.params.pageName})
        if (!pageData.data.pageData) return {notFound: true}


        return {
            props: {
                ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
                ...firstLoadData,
                pageInfo: pageData.data ? pageData.data.pageData : {},
            }
        }
    })


// export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
//
//     if (!context.query.pageName)   return {notFound: true}
//     const firstLoadData = await getFirstLoadData(context.req,[context.query.pageName, context.query.pageName + 'LeftSidebar',context.query.pageName + 'RightSidebar'],store)
//     let responseCode = 200
//     const pageData = await getPageData({pageName: context.query.pageName})
//     if (!pageData.data.pageData)return { notFound: true}
//
//     return {
//         props: {
//             ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
//             ...firstLoadData,
//             pageInfo:pageData.data ? pageData.data.pageData : {},
//             query:context.query,
//             responseCode
//         }
//     }
// })

export default page;

