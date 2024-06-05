import {fetchPage} from "@lib/fetch-requests/client/fetchPage";

type Props = {
    params: { pageName: string, lang: string }
}

const pageMetaGenerator = async ({params:{pageName,lang}}:Props)=>{

    const pageData = await fetchPage({pageName});
    const pageTitle = pageData.pageData?.translations?.[lang]?.title || pageData.pageData.title|| pageData.pageData.pageName

    return {
        // alternates: {
        //     canonical: `/page/${pageTitle}`,
        //     languages: process.env.NEXT_PUBLIC_LOCALES?.replace(`${process.env.NEXT_PUBLIC_DEFAULT_LOCALE} `,'')
        //         ?.split(' ').reduce((finalValue:{[key:string]:string},currentLocale)=>{
        //             finalValue[currentLocale] = `/${currentLocale}/page/${pageTitle}`
        //             return finalValue
        //         },{}),
        // },
        title:pageTitle,
        description: pageData.pageData?.translations?.[lang]?.description || pageData.pageData.description,
    }

}

export default pageMetaGenerator