const APIServerUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const fetchWidgets = async (widgets: string[], locale: string)=>{
    try {
        const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`
        const response = await fetch(`${APIServerUrl}/api/v1/widgets/getWidgets${widgetsQuery}`)
        return await response.json()
    }catch (error){
        console.error('error=> ',error)
    }
}


