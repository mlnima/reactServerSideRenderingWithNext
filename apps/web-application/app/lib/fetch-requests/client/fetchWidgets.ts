import config from "./config";

const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface IFetchWidget{
    widgets:string[],
    locale:string,
    revalidate?:number | undefined,
    tags?:string[]
}

export const fetchWidgets = async ({widgets, locale, revalidate, tags}:IFetchWidget)=>{
    try {
        const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`

        const response = await fetch(
            `${APIServerUrl}/api/v1/widgets/getWidgets${widgetsQuery}`,
            config({revalidate,tags:[...(tags || []),'cacheItem','widgets']})
        );

        if (!response.ok) {
            const errorData = await response.text();
            // throw new Error(errorData);
        }

        return  response.json()
    }catch (error){
        throw error;
    }
}


// export const fetchWidgets = async (widgets: string[], locale: string,revalidate?:number|null,tags?:string[])=>{
//     try {
//         const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`
//
//         const response = await fetch(
//             `${APIServerUrl}/api/v1/widgets/getWidgets${widgetsQuery}`,
//             config({revalidate,tags:[...(tags || []),'cacheItem','widgets']})
//         );
//
//         if (!response.ok) {
//             const errorData = await response.text();
//             // throw new Error(errorData);
//         }
//
//         return  response.json()
//     }catch (error){
//         throw error;
//     }
// }



