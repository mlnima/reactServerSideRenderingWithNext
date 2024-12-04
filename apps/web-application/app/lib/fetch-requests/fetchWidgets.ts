import config from './config';

const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

interface IFetchWidget {
    widgets: string[];
    locale: string;
    revalidate?: number | undefined;
    tags?: string[];
}

export const fetchWidgets = async ({ widgets, locale, revalidate, tags }: IFetchWidget): Promise<any> => {
    try {
        const widgetsQuery = `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`;

        const init = config({
            revalidate,
            tags: [...(tags || []), 'cacheItem', 'widgets'],
        });

        const response = await fetch(`${APIServerUrl}/api/v1/widget${widgetsQuery}`, init);

        return response.json();
    } catch {
        return;
    }
};


// export const fetchWidgets = async ({widgets, locale, revalidate, tags}:IFetchWidget)=>{
//     try {
//         const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`
//
//         const response = await fetch(
//             `${APIServerUrl}/api/v1/widget${widgetsQuery}`,
//             config({revalidate,tags:[...(tags || []),'cacheItem','widgets']})
//         );
//         return  response.json()
//     }catch{
//         return
//     }
// }

// if (!response.ok) {
//     const errorData = await response.text();
//     // throw new Error(errorData);
// }

// export const fetchWidgets = async (widgets: string[], locale: string,revalidate?:number|null,tags?:string[])=>{
//     try {
//         const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`
//
//         const response = await fetch(
//             `${APIServerUrl}/api/v1/widget${widgetsQuery}`,
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



