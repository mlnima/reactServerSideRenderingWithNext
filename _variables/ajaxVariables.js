import axios from "axios";
import {getAbsolutePath} from "./_variables";

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
export const getSingleWidgetData = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + '/api/v1/settings/getSingleWidgetData', body)
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
    //console.log(widgetData)
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

export const postThumbnailsUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-postThumbnailsUpload', image)
}

export const uploadFiles = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-uploadFiles', image)
}

export const postProductTypeImages = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-postProductTypeImages', image)
}


export const userImageUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-userImageUpload', image)
}
// will be remove
export const contactAjaxPost = async (data) => {
    const body ={
        data
    }
    return await axios.post(window.location.origin + '/api/v1/form/contact', body)
}
//-- forms

export const saveFormWidgetData = async (data) => {
    const body ={
        data
    }
    return await axios.post(window.location.origin + '/api/v1/forms/save', body)
}

export const getFormData = async (data) => {
    const body ={
        data
    }
    return await axios.post(window.location.origin + '/api/v1/forms/get', body)
}
export const getSingleFormData = async (data,domainName) => {
    const body ={
        ...data
    }
    return await axios.post(domainName + '/api/v1/forms/getFormData', body)
}

//pages
export const saveNewPage = async (data) => {
    const body ={
        ...data
    }
    return await axios.post(window.location.origin + '/api/v1/pages/new', body)
}
export const updatePage = async (data) => {
    const body ={
        ...data,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/pages/update', body)
}
export const getPageData = async (data,domainName) => {
    const body ={
        ...data
    }
    return await axios.post(domainName + '/api/v1/pages/getPageData', body)
}
export const deletePage = async (id,domainName) => {
    const body ={
        id,
        token: localStorage.wt
    }
    return await axios.post(domainName + '/api/v1/pages/deletePage', body)
}
export const getPagesData = async (data) => {
    const body ={
        ...data,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/v1/pages/getPagesData', body)
}

//others
export const youtubeDataScrapper = async (url) => {
    const body = {
        url,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/v1/scrap/youtube', body)
}

export const getOrders = async (data, domainName) => {

    const body = {
        ...data,
        token: localStorage.wt
    };

    return await axios.post(domainName + `/api/v1/order/get`, body)
};

export const getFirstLoadData = async  req =>{
    const domainName = req ? await getAbsolutePath(req) : '';
    const refererUrl = req?.headers?.referer
    const referer = refererUrl ? refererUrl.includes(req?.headers?.host)  :false
    //const referer = !!req.headers.referer
    const isSameOrigin =  req.headers['sec-fetch-site'] === 'same-origin';
    const isNavigatedFromPostPage = /video|post|article|product/.test(req.headers.referer)
    const firstLoadWidgetsData = !req.headers.referer ? await getMultipleWidgetWithData({widgets: ['footer', 'header', 'topBar', 'navigation']}, domainName, true, 'firstLoadWidgetsData') : []
    //const settingsData = await getMultipleSetting({settings: ['identity', 'design']}, domainName, true, 'postPage')
    const settingsData =!req.headers.referer ? await getMultipleSetting({settings: ['identity', 'design']}, domainName, true, 'postPage'):{}
    let isMobile = (req ? req.headers['user-agent']: navigator.userAgent).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)

    return {
        domainName:req ? await getAbsolutePath(req) : '',
        settings:settingsData?.data?.settings ?? [],
        widgets:firstLoadWidgetsData?.data?.widgets ?? [],
        referer,
        isSameOrigin,
        isNavigatedFromPostPage,
        isMobile,

    }
}
