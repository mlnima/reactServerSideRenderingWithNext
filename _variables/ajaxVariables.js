import axios from "axios";

export const updateSetting = async (type, data) => {
    const body = {
        token: localStorage.wt,
        type,
        data
    };
    return await axios.post(window.location.origin + '/api/v1/settings/update', body)
};

export const saveCustomStyle = async (data) => {
    const body = {
        token: localStorage.wt,
        data
    };
    return await axios.post(window.location.origin + '/api/v1/settings/saveCustomStyle', body)
};

export const getSetting = async (type, domainName, cache, whichPage) => {
    console.log(type, domainName, cache, whichPage)
    const pageNameForCachedRequest = whichPage ? `&position=${ whichPage }`: ''
    const body = {
        type,
        cache
    };

    return await axios.post(domainName + `/api/v1/settings/get?type=${ type }${ pageNameForCachedRequest }`, body)
};

export const addNewWidget = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/settings/addWidget', body)
}

// export const getWidgets = async (position,cache, domainName) => {
//     const body = {
//         position,
//     };
//     return await axios.post(domainName + '/api/v1/settings/getWidget', body)
// }

export const getMultipleWidgetWithData = async (widgets, domainName,cache, whichPage) => {
    const body = {
        ...widgets,
        cache
    };
    return await axios.post(domainName + `/api/v1/settings/getMultipleWidgetWithData?whichPage=${ whichPage }`, body)
}

export const getMultipleSetting = async (settings, domainName, cache, whichPage) => {
    const body = {
        ...settings,
        cache
    };
    return await axios.post(domainName + `/api/v1/settings/getMultiple?whichPage=${ whichPage }`, body)
};

export const getWidgetsWithData = async (position, domainName) => {
    const body = {
        position,
    };
    return await axios.post(domainName + `/api/v1/settings/getWidgetsWithData`, body)
}

export const updateWidgets = async (widgetData) => {

    // console.log(id)
    console.log(widgetData)
    const body = {
        widgetData,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/settings/updateWidget', body)
}

export const deleteWidgets = async (id) => {
    const body = {
        id,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/settings/deleteWidget', body)
}

export const executor = async (command) => {
    const body = {
        command,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/settings/executor', body)
}

export const fileUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-uploadFile', image)
}

export const userImageUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-userImageUpload', image)
}

export const youtubeDataScrapper = async (url) => {
    const body = {
        url,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/scrap/youtube', body)
}

