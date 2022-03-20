import axios from "axios";




//others
export const youtubeDataScrapper = async (url) => {
    const body = {
        url,
        token: localStorage.wt
    };
    return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/scrapper/scrapYoutubeInfo', body)
}



// export const deletePage = async (id) => {
//     const body = {
//         id,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/deletePage', body)
// }

//
// export const getPagesData = async (data) => {
//     const body = {
//         ...data,
//         token: localStorage.wt
//     }
//     return await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/admin/pages/getPagesData', body)
// }

// import {getSettings} from "@store/clientActions/settingsActions";
// import {getWidgets} from "@store/clientActions/clientWidgetsActions";
//

// export const getFirstLoadData = async (req, dynamicWidgets,store,locale) => {
//     try {
//         const cache = process.env.NODE_ENV !== 'development'
//         const userAgent = req.headers['user-agent'];
//         await store.dispatch(getWidgets(dynamicWidgets,locale,cache))
//         await store.dispatch(getSettings(userAgent,req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress))
//         return {}
//     } catch (err) {
//         console.log(err)
//     }
// }
