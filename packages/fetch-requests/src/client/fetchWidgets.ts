const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const fetchWidgets = async (widgets: string[], locale: string,revalidate?:number|null)=>{
    try {
        const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`

        const config = {
            next:{
                revalidate: revalidate ? revalidate : process.env.NODE_ENV === 'development' ? 1 : 604800
            }
        }

        //@ts-ignore
        const response = await fetch(`${APIServerUrl}/api/v1/widgets/getWidgets${widgetsQuery}`,config)
        return await response.json()
    }catch (error){
        console.error('error=> ',error)
    }
}


