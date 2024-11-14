import {fetchPage} from "@lib/fetch-requests/fetchPage";
import {AlternatesGenerators} from "@lib/alternatesCanonicalGenerator";
import {IPageProps} from "@repo/typescript-types";

const alternatesGenerators = new AlternatesGenerators()

const pageMetaGenerator = async (props: IPageProps)=>{
    //const searchParams = await props.searchParams;
    const params = await props.params;

    const pageData = await fetchPage({pageName:params.pageName});
    const pageTitle = pageData.pageData?.translations?.[params.lang]?.title || pageData.pageData.title|| pageData.pageData.pageName

    return {
        alternates: alternatesGenerators.customPage(params.lang,pageData.pageData.pageName),
        title:pageTitle,
        description: pageData.pageData?.translations?.[params.lang]?.description || pageData.pageData.description,
    }

}

export default pageMetaGenerator