import axios from "axios";

export const updateSetting = async (type, data) => {
    const body = {
        token: localStorage.wt,
        type,
        data
    };
    return await axios.post(window.location.origin + '/api/v1/settings/update', body)
};


export const getSetting = async (type, cache, domainName) => {

    const body = {
        type,
    };
    return await axios.post(domainName + `/api/v1/settings/get?type=${ type }`, body)
};


export const addNewWidget = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/settings/addWidget', body)
}


export const getWidgets = async (position,cache, domainName) => {
    const body = {
        position,
    };
    return await axios.post(domainName + '/api/v1/settings/getWidget', body)
}


export const getMultipleWidgetWithData = async (widgets, cache, domainName) => {
    const body = {
        ...widgets,
    };
    return await axios.post(domainName + '/api/v1/settings/getMultipleWidgetWithData', body)
}


export const getMultipleSetting = async (settings, cache, domainName) => {
    const isCache = cache ? '' : `?cache=${ Date.now() }`
    const body = {
        ...settings
    };
    return await axios.post(domainName + `/api/v1/settings/getMultiple`, body)
};


export const getWidgetsWithData = async (position,domainName) => {
    const body = {
        position,
    };
    return await axios.post(domainName + '/api/v1/settings/getWidgetsWithData', body)
}


export const updateWidgets = async (id, data) => {
    const body = {
        id,
        data,
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


