import axios from "axios";
// import _getMultipleSettingsQueryGenerator from "./clientVariables/_getMultipleSettingsQueryGenerator";
// import _getMultipleWidgetWithDataQueryGenerator from "./clientVariables/_getMultipleWidgetWithDataQueryGenerator";
// import {SET_SETTINGS, SET_WIDGETS_IN_GROUPS} from "@store/types";
import {getSettings} from "@store/clientActions/settingsActions";
import {getWidgets} from "@store/clientActions/clientWidgetsActions";



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


export const getFirstLoadData = async (req, dynamicWidgets,store,locale) => {
    try {
        const cache = process.env.NODE_ENV !== 'development'
        const userAgent = req.headers['user-agent'];
        await store.dispatch(getWidgets(dynamicWidgets,locale,cache))
        await store.dispatch(getSettings(userAgent,req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress))
        return {}
    } catch (err) {
        console.log(err)
    }
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

// export const getFormData = async (data) => {
//     const body = {
//         ...data,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/forms/getFormData', body)
// }




// export const getSetting = async (type, cache) => {
//     return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/settings/getSetting?type=${type}&cache=${cache}&token=${localStorage.wt}`);
// };



// export const getMultipleWidgetWithData = async (widgets, cache,locale) => {
//     return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(widgets.widgets, cache,locale)}`)
// }

// export const getMultipleSetting = async (settings, cache) => {
//     return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/settings/getMultipleSettings${_getMultipleSettingsQueryGenerator(settings.settings, cache)}`)
// };

// export const executor = async (command) => {
//     const body = {
//         command,
//         token: localStorage.wt
//     };
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/terminal/commandExecutor', body)
// }


//pages
// export const saveNewPage = async (data) => {
//     const body = {
//         ...data,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/createNewPage', body)
// }
// export const updatePage = async (data) => {
//     const body = {
//         ...data,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/updatePage', body)
// }
// export const getPageData = async (data) => {
//     const body = {
//         ...data
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/pages/getPageData', body)
// }
// export const getPagesDataForStaticGeneration = async () => {
//     return await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/pages/getPagesData')
// }

// export const getOrders = async (data, domainName) => {
//
//     const body = {
//         ...data,
//         token: localStorage.wt
//     };
//
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/admin/orders/getOrders`, body)
// };

// export const getFormsData = async (data) => {
//     const body = {
//         data,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/forms/getFormsData', body)
// }

// export const getFirstLoadDataStatic = async ( dynamicWidgets,store) => {
//     try {
//         const cache = process.env.NODE_ENV !== 'development'
//         const referer = false;
//         const dynamicWidgetsToGet = dynamicWidgets && dynamicWidgets.length  ? [...dynamicWidgets] : [];
//         const staticWidgetsToGet = referer ? [] : ['footer', 'header', 'topBar', 'navigation'];
//         const widgetData = await getMultipleWidgetWithData({widgets: [...dynamicWidgetsToGet, ...staticWidgetsToGet]}, cache)
//         const widgets = widgetData.data?.widgets || []
//         const settings = await getMultipleSetting({settings: ['identity', 'design']},false)
//
//         const identityData = settings.data.settings ? settings.data.settings.find(s=>s.type==='identity') :{}
//         const designData = settings.data.settings ? settings.data.settings.find(s=>s.type==='design') : {}
//
//         const identity = identityData.data
//         const design =  designData.data
//
//
//         store.dispatch({type:SET_WIDGETS,payload:widgets})
//
//         store.dispatch({
//             type:SET_SETTINGS,
//             payload: {
//                 design:design,
//                 identity:identity,
//                 eCommerce:{},
//             }
//         })
//
//         return {
//             // identity,
//             // design,
//             // widgets,
//             // referer,
//
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }

