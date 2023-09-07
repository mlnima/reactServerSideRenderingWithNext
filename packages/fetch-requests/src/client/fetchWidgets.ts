import config from "./config";

const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const fetchWidgets = async (widgets: string[], locale: string,revalidate?:number|null)=>{
    try {
        const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`

        const response = await fetch(
            `${APIServerUrl}/api/v1/widgets/getWidgets${widgetsQuery}`,
            config({revalidate})
        );

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        return  response.json()
    }catch (error){
        throw error;
    }
}


