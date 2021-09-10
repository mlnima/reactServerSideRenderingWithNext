import axios from "axios";
import _getMultipleSettingsQueryGenerator from "./clientVariables/_getMultipleSettingsQueryGenerator";
import _getMultipleWidgetWithDataQueryGenerator from "./clientVariables/_getMultipleWidgetWithDataQueryGenerator";

export const updateSetting = async (type, data) => {
    const body = {
        type,
        data,
        token: localStorage.wt,
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/settings/update', body)
};

export const getSetting = async (type, cache) => {
    return await axios.get(process.env.REACT_APP_PRODUCTION_URL + `/api/admin/settings/getSetting?type=${type}&cache=${cache}&token=${localStorage.wt}`);
};

export const addNewWidget = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/widgets/addNewWidget', body);
}

export const getMultipleWidgetWithData = async (widgets, cache) => {
    return await axios.get(process.env.REACT_APP_PRODUCTION_URL + `/api/v1/widgets/getMultipleWidgetWithData${_getMultipleWidgetWithDataQueryGenerator(widgets.widgets, cache)}`)
}

export const getMultipleSetting = async (settings, cache) => {

    return await axios.get(process.env.REACT_APP_PRODUCTION_URL + `/api/v1/settings/getMultipleSettings${_getMultipleSettingsQueryGenerator(settings.settings, cache)}`)
};


export const updateWidgets = async (widgetData) => {
    const body = {
        widgetData,
        token: localStorage.wt
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/widgets/updateWidget', body)
}

export const deleteWidgets = async (id) => {
    const body = {
        id,
        token: localStorage.wt
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/widgets/deleteWidget', body)
}

export const executor = async (command) => {
    const body = {
        command,
        token: localStorage.wt
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/terminal/commandExecutor', body)
}

export const fileUpload = async (file) => {

    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/fileManager/uploadFile', file)
}

export const uploadFiles = async (image) => {
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/fileManager/uploadFiles', image)
}

export const postThumbnailsUpload = async (image) => {
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/fileManager/postThumbnailsUpload', image)
}


export const postProductTypeImages = async (image) => {
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/v1/settings/fileManagerControllers-postProductTypeImages', image)
}


export const userImageUpload = async (image) => {
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/v1/fileManager/userImageUpload', image)
}


export const saveFormWidgetData = async (data) => {
    const body = {
        data
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/v1/forms/saveFormData', body)
}

export const getFormsData = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/forms/getFormsData', body)
}

export const getFormData = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/forms/getFormData', body)
}

//pages
export const saveNewPage = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/pages/createNewPage', body)
}
export const updatePage = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/pages/updatePage', body)
}
export const getPageData = async (data) => {
    const body = {
        ...data
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/v1/pages/getPageData', body)
}
export const deletePage = async (id) => {
    const body = {
        id,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/pages/deletePage', body)
}
export const getPagesData = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/pages/getPagesData', body)
}

//others
export const youtubeDataScrapper = async (url) => {
    const body = {
        url,
        token: localStorage.wt
    };
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/scrapper/scrapYoutubeInfo', body)
}

export const getOrders = async (data, domainName) => {

    const body = {
        ...data,
        token: localStorage.wt
    };

    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + `/api/admin/orders/getOrders`, body)
};

export const getFirstLoadData = async (req, dynamicWidgets) => {

    try {

        const cache = process.env.NODE_ENV !== 'development'
        // const refererUrl = req?.headers?.referer || '';
        const referer = false;
        const isSameOrigin = req.headers['sec-fetch-site'] === 'same-origin';

        const dynamicWidgetsToGet = dynamicWidgets && dynamicWidgets.length > 0 ? [...dynamicWidgets] : [];
        const staticWidgetsToGet = referer ? [] : ['footer', 'header', 'topBar', 'navigation'];

        const widgetData = await getMultipleWidgetWithData({widgets: [...dynamicWidgetsToGet, ...staticWidgetsToGet]}, cache)
        const widgets = widgetData.data?.widgets || []

       // const settingsData = !referer ? await getMultipleSetting({settings: ['identity', 'design']}, cache) : {};
        let settings = {
            identity: process.env.REACT_APP_SETTING_IDENTITY ? JSON.parse(process.env.REACT_APP_SETTING_IDENTITY) : {},
            // design:  process.env.REACT_APP_SETTING_DESIGN ? JSON.parse(process.env.REACT_APP_SETTING_DESIGN) : {}
        }

        let isMobile = (req ? req.headers['user-agent'] : navigator.userAgent).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

        return {
            // domainName,
            settings,
            widgets,
            referer,
            isSameOrigin,
            isMobile,
        }
    } catch (e) {
        console.log(e)
    }


}

