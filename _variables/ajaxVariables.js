import axios from "axios";
import {getAbsolutePath} from "./_variables";

export const updateSetting = async (type, data) => {
    const body = {
        token: localStorage.wt,
        type,
        data
    };
    return await axios.post(window.location.origin + '/api/admin/settings/update', body)
};

// export const saveCustomStyle = async (data) => {
//     const body = {
//         token: localStorage.wt,
//         data
//     };
//     return await axios.post(window.location.origin + '/api/v1/settings/saveCustomStyle', body)
// };

export const getSetting = async (type, domainName, cache, whichPage) => {
    const pageNameForCachedRequest = whichPage ? `&position=${whichPage}` : ''
    const body = {
        type,
        cache
    };

    return await axios.post(domainName + `/api/admin/settings/getSetting?type=${type}${pageNameForCachedRequest}`, body)
};

export const addNewWidget = async (data) => {
    const body = {
        data,
        token: localStorage.wt
    };
    return await axios.post(window.location.origin + '/api/admin/widgets/addNewWidget', body)
}


export const getSingleWidgetData = async (data) => {
    const body = {
        ...data,
    };
    return await axios.post(window.location.origin + '/api/v1/widgets/getSingleWidgetData', body)
}

// export const getWidgets = async (position,cache, domainName) => {
//     const body = {
//         position,
//     };
//     return await axios.post(domainName + '/api/v1/settings/getWidget', body)
// }

export const getMultipleWidgetWithData = async (widgets, domainName, cache, whichPage) => {
    const body = {
        ...widgets,
        cache
    };
   return await axios.post(domainName + `/api/v1/widgets/getMultipleWidgetWithData?whichPage=${whichPage}`, body)

}

export const getMultipleSetting = async (settings, domainName, cache, whichPage) => {

    const body = {
        ...settings,
        cache
    };

    return await axios.post(domainName + `/api/v1/settings/getMultipleSettings?whichPage=${whichPage}`, body)
};

export const getWidgetsWithData = async (position, domainName) => {
    const body = {
        position,
    };
    return await axios.post(domainName + `/api/v1/settings/getWidgetsWithData`, body)
}

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

export const fileUpload = async (image) => {
    return await axios.post(window.location.origin + '/api/admin/fileManager/uploadFile', image)
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
    return await axios.post(window.location.origin + '/api/admin/forms/getFormsData', body)
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
        ...data
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
    return await axios.post(window.location.origin + '/api/admin/pages/getPagesData', body)
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

export const getFirstLoadData = async (req,dynamicWidgets,page) => {

    try {
        const domainName = process.env.REACT_APP_PRODUCTION_URL;
        const refererUrl = req?.headers?.referer;
        //const referer =   process.env.NODE_ENV !== 'development'  ?     refererUrl   ? refererUrl.includes(req?.headers?.host) && !refererUrl.includes('sitemap')&& !refererUrl.includes('/admin')  : false: false;
        const referer =  refererUrl ? refererUrl.includes(req?.headers?.host) && !refererUrl.includes('sitemap')&& !refererUrl.includes('/admin')  : false;
        const isSameOrigin = req.headers['sec-fetch-site'] === 'same-origin';
        const isNavigatedFromPostPage = /video|post|article|product/.test(refererUrl);
        const widgetsToRequest = referer ? dynamicWidgets : ['footer', 'header', 'topBar', 'navigation',...dynamicWidgets]
        const pageNameForCacheRequest = referer ? page ? page : 'static' : 'firstLoadWidgetsData' + (page||'static')
        const firstLoadWidgetsData =await getMultipleWidgetWithData({widgets: widgetsToRequest}, domainName, true, pageNameForCacheRequest);

        const settingsData = !referer ? await getMultipleSetting({settings: ['identity', 'design']}, domainName, true, 'static') : {};

        let finalSettings = settingsData.data ? {
            identity:settingsData?.data?.settings.find(s=>s.type === 'identity'),
            design:settingsData?.data?.settings.find(s=>s.type === 'design')
        } :{}

        let isMobile = (req ? req.headers['user-agent'] : navigator.userAgent).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i);
        return {
            domainName,
            settings:finalSettings ?? {},
            widgets:firstLoadWidgetsData?.data?.widgets ?? [],
            referer,
            isSameOrigin,
            isNavigatedFromPostPage,
            isMobile,
        }


    }catch (e) {
console.log(e)
    }


}

export const getStaticLoadData = async () => {
    const domainName = process.env.REACT_APP_PRODUCTION_URL;
    const settingsData =  await getMultipleSetting({settings: ['identity', 'design']}, domainName, true, 'postPage');
    return {
        domainName,
        settings: settingsData?.data?.settings ?? [],
        widgets: firstLoadWidgetsData?.data?.widgets ?? [],
        referer:false,
        isSameOrigin:false,
        isNavigatedFromPostPage:false,
        isMobile:false,
    }
}