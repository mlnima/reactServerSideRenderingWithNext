import axios from "axios";
import _getMultipleSettingsQueryGenerator from "./clientVariables/_getMultipleSettingsQueryGenerator";
import _getMultipleWidgetWithDataQueryGenerator from "./clientVariables/_getMultipleWidgetWithDataQueryGenerator";

export const updateSetting = async (type, data) => {
    const body = {
        type,
        data,
        token: localStorage.wt,
    };
    return await axios.post(window.location.origin + '/api/admin/settings/update', body)
};

export const getSetting = async (type, domainName, cache, whichPage) => {
    const pageNameForCachedRequest = whichPage ? `&position=${whichPage}` : '';
    const body = {
        type,
        cache,
        token: localStorage.wt
    };
    return await axios.post(domainName + `/api/admin/settings/getSetting?type=${type}${pageNameForCachedRequest}`, body);
};

export const addNewWidget = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/admin/widgets/addNewWidget', body);
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
    return await axios.post(window.location.origin + '/api/admin/widgets/updateWidget', body)
}

export const deleteWidgets = async (id) => {
    const body = {
        id,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/admin/widgets/deleteWidget', body)
}

export const executor = async (command) => {
    const body = {
        command,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/admin/terminal/commandExecutor', body)
}

export const fileUpload = async (file) => {

    return await axios.post(window.location.origin + '/api/admin/fileManager/uploadFile', file)
}

export const uploadFiles = async (image) => {
    return await axios.post(window.location.origin + '/api/admin/fileManager/uploadFiles', image)
}

export const postThumbnailsUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/admin/fileManager/postThumbnailsUpload', image)
}


export const postProductTypeImages = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/settings/fileManagerControllers-postProductTypeImages', image)
}


export const userImageUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/v1/fileManager/userImageUpload', image)
}


export const saveFormWidgetData = async (data) => {
    const body = {
        data
    }
    return await axios.post(window.location.origin + '/api/v1/forms/saveFormData', body)
}

export const getFormsData = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    }
    return await axios.post(process.env.REACT_APP_PRODUCTION_URL + '/api/admin/forms/getFormsData', body)
}

export const getFormData = async (data, domainName) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(domainName + '/api/admin/forms/getFormData', body)
}

//pages
export const saveNewPage = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/admin/pages/createNewPage', body)
}
export const updatePage = async (data) => {
    const body = {
        ...data,
        token: localStorage.wt
    }
    return await axios.post(window.location.origin + '/api/admin/pages/updatePage', body)
}
export const getPageData = async (data, domainName) => {
    const body = {
        ...data
    }
    return await axios.post(domainName + '/api/v1/pages/getPageData', body)
}
export const deletePage = async (id, domainName) => {
    const body = {
        id,
        token: localStorage.wt
    }
    return await axios.post(domainName + '/api/admin/pages/deletePage', body)
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
    return await axios.post(window.location.origin + '/api/admin/scrapper/scrapYoutubeInfo', body)
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
        const domainName = process.env.REACT_APP_PRODUCTION_URL;
        const cache = process.env.NODE_ENV !== 'development'
        const refererUrl = req?.headers?.referer || '';
        const referer = false;
        const isSameOrigin = req.headers['sec-fetch-site'] === 'same-origin';
        const isNavigatedFromPostPage = /video|post|article|product/.test(refererUrl);
        // const widgetsToRequest = referer ? dynamicWidgets : ['footer', 'header', 'topBar', 'navigation',...dynamicWidgets];
        //
        //
        // const firstLoadWidgetsData =   await getMultipleWidgetWithData({widgets: widgetsToRequest}, cache);

        const dynamicWidgetsData = dynamicWidgets && dynamicWidgets.length > 0 ? await getMultipleWidgetWithData({widgets: dynamicWidgets}, cache) : []
        const staticWidgetsData = referer ? [] : await getMultipleWidgetWithData({widgets: ['footer', 'header', 'topBar', 'navigation']}, cache)

        const widgets = [...dynamicWidgetsData.data?.widgets, ...staticWidgetsData.data?.widgets]

        const settingsData = !referer ? await getMultipleSetting({settings: ['identity', 'design']}, cache) : {};
        let finalSettings = settingsData.data ? {
            identity: settingsData?.data?.settings.find(s => s.type === 'identity'),
            design: settingsData?.data?.settings.find(s => s.type === 'design')
        } : {};

        let isMobile = (req ? req.headers['user-agent'] : navigator.userAgent).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);

        return {
            domainName,
            settings: finalSettings ?? {},
            widgets,
            referer,
            isSameOrigin,
            isNavigatedFromPostPage,
            isMobile,
        }
    } catch (e) {
        console.log(e)
    }


}

// export const getStaticLoadData = async () => {
//     const domainName = process.env.REACT_APP_PRODUCTION_URL;
//     const settingsData =  await getMultipleSetting({settings: ['identity', 'design']}, true);
//     return {
//         domainName,
//         settings: settingsData?.data?.settings ?? [],
//         widgets: firstLoadWidgetsData?.data?.widgets ?? [],
//         referer:false,
//         isSameOrigin:false,
//         isNavigatedFromPostPage:false,
//         isMobile:false,
//     }
// }


// export const getWidgetsWithData = async (position, domainName) => {
//     const body = {
//         position,
//     };
//     return await axios.post(domainName + `/api/v1/settings/getWidgetsWithData`, body)
// }

// export const saveCustomStyle = async (data) => {
//     const body = {
//         token: localStorage.wt,
//         data
//     };
//     return await axios.post(window.location.origin + '/api/v1/settings/saveCustomStyle', body)
// };


// export const getSingleWidgetData = async (data) => {
//     const body = {
//         ...data,
//     };
//     return await axios.post(window.location.origin + '/api/v1/widgets/getSingleWidgetData', body);
// }

// export const getWidgets = async (position,cache, domainName) => {
//     const body = {
//         position,
//     };
//     return await axios.post(domainName + '/api/v1/settings/getWidget', body)
// }