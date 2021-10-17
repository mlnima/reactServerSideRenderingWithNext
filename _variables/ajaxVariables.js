import axios from "axios";
import _getMultipleSettingsQueryGenerator from "./clientVariables/_getMultipleSettingsQueryGenerator";
import _getMultipleWidgetWithDataQueryGenerator from "./clientVariables/_getMultipleWidgetWithDataQueryGenerator";
import {SET_SETTINGS,SET_WIDGETS} from "../store/types";


export const getSetting = async (type, cache) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/getSetting?type=${type}&cache=${cache}&token=${localStorage.wt}`);
};

export const addNewWidget = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/addNewWidget', body);
}

export const getMultipleWidgetWithData = async (widgets, cache) => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(widgets.widgets, cache)}`)
}

export const getMultipleSetting = async (settings, cache) => {

    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/settings/getMultipleSettings${_getMultipleSettingsQueryGenerator(settings.settings, cache)}`)
};


export const updateWidgets = async (widgetData) => {
    const body = {
        widgetData,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/updateWidget', body)
}

export const deleteWidgets = async (id) => {
    const body = {
        id,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/widgets/deleteWidget', body)
}

export const executor = async (command) => {
    const body = {
        command,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/terminal/commandExecutor', body)
}

export const fileUpload = async (file) => {

    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/uploadFile', file)
}

export const uploadFiles = async (image) => {
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/uploadFiles', image)
}

export const postThumbnailsUpload = async (image) => {
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/fileManager/postThumbnailsUpload', image)
}


export const postProductTypeImages = async (image) => {
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/settings/fileManagerControllers-postProductTypeImages', image)
}


export const userImageUpload = (image) => {
    return axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/fileManager/userImageUpload', image)
}


export const saveFormWidgetData = async (data) => {
    const body = {
        data
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/forms/saveFormData', body)
}

export const getFormsData = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/forms/getFormsData', body)
}

export const getFormData = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/forms/getFormData', body)
}

//pages
export const saveNewPage = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/createNewPage', body)
}
export const updatePage = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/updatePage', body)
}
export const getPageData = async (data) => {
    const body = {
        ...data
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/pages/getPageData', body)
}
export const getPagesDataForStaticGeneration = async () => {
    return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/pages/getPagesData')
}
export const deletePage = async (id) => {
    const body = {
        id,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/deletePage', body)
}
export const getPagesData = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/getPagesData', body)
}

//others
export const youtubeDataScrapper = async (url) => {
    const body = {
        url,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/scrapper/scrapYoutubeInfo', body)
}

export const getOrders = async (data, domainName) => {

    const body = {
        ...data,
        token: localStorage.wt
    };

    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/orders/getOrders`, body)
};

export const getFirstLoadData = async (req, dynamicWidgets,store) => {
    try {

        const cache = process.env.NODE_ENV !== 'development'
        const dynamicWidgetsToGet = dynamicWidgets && dynamicWidgets.length > 0 ? [...dynamicWidgets] : [];
        const staticWidgets = process.env.NEXT_PUBLIC_STATIC_WIDGETS ? JSON.parse(process.env.NEXT_PUBLIC_STATIC_WIDGETS) : []
        const widgetData = await getMultipleWidgetWithData({widgets: [...dynamicWidgetsToGet]}, cache)
        const dynamicWidgetsData = widgetData.data?.widgets ?? []
        const allWidgets = [...staticWidgets,...dynamicWidgetsData]
        const identity = process.env.NEXT_PUBLIC_SETTING_IDENTITY ? JSON.parse(process.env.NEXT_PUBLIC_SETTING_IDENTITY) : {}
        const design =  process.env.NEXT_PUBLIC_SETTING_DESIGN ? JSON.parse(process.env.NEXT_PUBLIC_SETTING_DESIGN) : {}

        store.dispatch({type:SET_WIDGETS,payload:allWidgets})
        store.dispatch({
            type:SET_SETTINGS,
            payload: {
                design:design,
                identity:identity,
                eCommerce:{},
            }
        })

        return { }
    } catch (e) {
        console.log(e)
    }
}

export const getFirstLoadDataStatic = async ( dynamicWidgets,store) => {
    try {
        const cache = process.env.NODE_ENV !== 'development'
        const referer = false;
        const dynamicWidgetsToGet = dynamicWidgets && dynamicWidgets.length > 0 ? [...dynamicWidgets] : [];
        const staticWidgetsToGet = referer ? [] : ['footer', 'header', 'topBar', 'navigation'];
        const widgetData = await getMultipleWidgetWithData({widgets: [...dynamicWidgetsToGet, ...staticWidgetsToGet]}, cache)
        const widgets = widgetData.data?.widgets || []
        const settings = await getMultipleSetting({settings: ['identity', 'design']},false)

        const identityData = settings.data.settings ? settings.data.settings.find(s=>s.type==='identity') :{}
        const designData = settings.data.settings ? settings.data.settings.find(s=>s.type==='design') : {}

        const identity = identityData.data
        const design =  designData.data


        store.dispatch({type:SET_WIDGETS,payload:widgets})

        store.dispatch({
            type:SET_SETTINGS,
            payload: {
                design:design,
                identity:identity,
                eCommerce:{},
            }
        })

        return {
            // identity,
            // design,
            // widgets,
            // referer,

        }
    } catch (e) {
        console.log(e)
    }
}

