import AxiosInstance from "../../lib/AxiosInstance";

const getWidgets = async (widgets: string[], locale: string) => {
    const widgetsQuery= `?${locale ? `&locale=${locale}` : ''}&${widgets.map(s => 'widget=' + s).join('&')}`

    return await AxiosInstance.get(`/api/v1/widgets/getWidgets${widgetsQuery}`)
}
export default getWidgets;