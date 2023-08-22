import {fetchPage} from "fetch-requests";

type Props = {
    params: { pageName: string, lang: string }
}

const pageMetaGenerator = async ({params:{pageName,lang}}:Props)=>{

    const pageData = await fetchPage({pageName});

    return {
        title: pageData.pageData?.translations?.[lang]?.title || pageData.pageData.title|| pageData.pageData.pageName,
        description: pageData.pageData?.translations?.[lang]?.description || pageData.pageData.description,
    }

}

export default pageMetaGenerator