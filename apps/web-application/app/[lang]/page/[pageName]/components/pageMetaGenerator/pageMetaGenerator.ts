import {fetchPage} from "@lib/fetch-requests/client/fetchPage";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";

type Props = {
    params: { pageName: string, lang: string }
}

const alternatesGenerators = new AlternatesGenerators()

const pageMetaGenerator = async ({params:{pageName,lang}}:Props)=>{

    const pageData = await fetchPage({pageName});
    const pageTitle = pageData.pageData?.translations?.[lang]?.title || pageData.pageData.title|| pageData.pageData.pageName

    return {
        alternates: alternatesGenerators.customPage(lang,pageData.pageData.pageName),
        title:pageTitle,
        description: pageData.pageData?.translations?.[lang]?.description || pageData.pageData.description,
    }

}

export default pageMetaGenerator