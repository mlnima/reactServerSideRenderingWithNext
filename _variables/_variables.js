//import ReactGA from 'react-ga'
import React from "react";

export const likeValueCalculator = (likes, dislikes) => {
    return (likes > 0 && dislikes > 0) ? (Math.round((likes * 100) / (likes + dislikes)))
        : (likes === 0 && dislikes === 0) ? 0
            : (likes === 0 && dislikes > 0) ? 0
                : (likes > 0 && dislikes === 0) ? 100
                    : 0;

}

export const getAbsolutePath = async (req) => {
    const protocol = process.env.REACT_APP_SSL === 'true' ? 'https' : await req.protocol
    return protocol + '://' + await req.get('Host')
}

export const generateAbsolutePath = () => {
    return window.location.protocol + '//' + window.location.host
}

export const clickPathGenerator = (clickedItemName, pathFromContexts) => {
    if (pathFromContexts === '.') {
        return './' + clickedItemName
    } else {
        return pathFromContexts + '/' + clickedItemName
    }
};

export const trimString = (string) => {
    return trimString()
}

export const convertVariableNameToName = (name) => {
    return name ?
        name.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + name.replace(/([A-Z])/g, " $1").slice(1) :
        ''
}

export const fileTypeDetector = fileName => {

    const splitFileName = fileName.split('.')
    const fileFormat = splitFileName[splitFileName.length - 1].toLowerCase()
    let finalFormat = ''
    const fileFormats = {
        image: ['jpg', 'png', 'jpeg', 'svg'],
        video: ['mp4', '3gp'],
        document: ['js', 'css', 'env', 'scss', 'txt'],
        application: ['exe'],
        archive: ['zip', 'rar']
    }
    // const images = [ '.jpg', '.png', 'jpeg', 'svg' ]
    // const video = [ '.mp4', '.3gp' ]
    // const documents = [ '.js', '.css', '.env', '.scss' ]
    Object.keys(fileFormats).forEach(formatArr => {
        if (fileFormats[formatArr].includes(fileFormat)) {
            finalFormat = formatArr
        }
    })


    return finalFormat
}

export const logEvent = (category = '', action = '') => {
    if (category && action) {
        ReactGA.event({category, action})
    }
}
export const logException = (description = '', fatal = false) => {
    if (description) {
        ReactGA.exception({description, fatal})
    }
}

export const queryToObject = (query) => {
    let finalObject = {}
    const splitByAnd = query.split('&')
    for (let q of splitByAnd) {
        const splitByEqual = q.split('=')
        finalObject[splitByEqual[0]] = splitByEqual[1]
    }
    return finalObject
}

export const getLanguageQuery = (url) => {
    const searchParams = new URLSearchParams(url);
    if (searchParams.has('lang')) {
        return {lang: searchParams.get('lang')}
    } else return null
}

export const getLanguageQueryFromWindowLocationSearch = () => {
    if (process.browser) {
        const spitUrl = window.location.search.split('?')
        const searchParams = new URLSearchParams('?' + spitUrl[1]);
        if (searchParams.has('lang')) {
            return {lang: searchParams.get('lang')}
        } else return null
    } else return null
}

export const addOrReplaceQueryToWindowLocationSearch = (queryName, queryValue) => {
    if (process.browser) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(queryName, queryValue)
        return searchParams.toString()
    } else return null
}

export const setLanguageToLocalStorage = (language) => {
    localStorage ? localStorage.setItem('lang', language) : null
}

export const getLanguageFromLocalStorage = () => {
    return localStorage ? localStorage.lang ? localStorage.lang : 'default' : 'default'
}

export const pathAndAsPathGenerator = (pathname, asPath, query) => {
    const data = {
        pathname: '',
        asPath: '',
        query
    }
    asPath.includes('/tags/') || asPath.includes('/categories/') || asPath.includes('/actors/') ? data.pathname = '/posts' :
        asPath.includes('/tags') || asPath.includes('/categories') || asPath.includes('/actors') ? data.pathname = '/meta' : data.pathname = pathname;
    if (asPath.includes('?')) {
        const asPathSplit = asPath.split('?')
        const searchParams = new URLSearchParams(asPathSplit[1]);
        if (localStorage.lang && localStorage.lang !== 'default') {

            searchParams.set('lang', localStorage.lang)

            if (query.page) {
                searchParams.set('page', query.page)
            }
            data.query = {
                ...data.query,
                lang: localStorage.lang
            }
        } else if (localStorage.lang === 'default' && asPath.includes('lang=')) {
            const page = query ? query.page ? `&page=${query.page}` : '' : ''
            data.asPath = asPathSplit[0] + '?' + searchParams.toString() + page
            searchParams.delete('lang')


        }

    } else {

        if (localStorage.lang && localStorage.lang !== 'default') {
            const page = query ? query.page ? `&page=${query.page}` : '' : ''
            data.asPath = asPath + '?lang=' + localStorage.lang + page
            data.pathname = pathname
        } else if (localStorage.lang === 'default') {
            const page = query.page ? `?page=${query.page}` : ''
            data.asPath = asPath + page
            data.pathname = pathname
        }
    }
    return data
}


export const adminConsoleOpenCloseHandler = (userData, state, dispatchState) => {
    if (userData.role === 'administrator') {
        state.console ?
            dispatchState({
                ...state,
                console: false
            }) : dispatchState({
                ...state,
                console: true
            })
    } else return null
}

export const jsonExporter = (data,fileName)=>{
    const contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {type: contentType});
        navigator.msSaveOrOpenBlob(blob, fileName);
        contextData.dispatchState({
            ...contextData.state,
            loading: false
        })
    } else {
        let a = document.createElement('a');
        a.download = fileName;
        a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }
}

export const languagesOptions = (process.env.REACT_APP_LOCALS.split(' ').filter(lang=>lang!== process.env.REACT_APP_DEFAULT_LOCAL) || []).map(lang => {
    return (
        <option key={lang} value={lang}>{lang}</option>
    )
})


export const ratingSetter = type =>{

}
export const rangeNumGenerator = (currentPageInput, max) =>{
    let currentPage = currentPageInput, // input
        range = 6,  // amount of links displayed
        maxPage = max - 1,
        start = 2;  // default
    let paging = [];      // output variable

    // Don't use negative values, force start at 1
    if (currentPage < (range / 2) + 1) {

        start = 1;
        // Don't go beyond the last page
    } else if (currentPage >= (maxPage - (range / 2))) {

        start = Math.floor(maxPage - range + 1);

    } else {
        start = (currentPage - Math.floor(range / 2));
    }

    for (let i = start; i <= ((start + range) - 1); i++) {
        if (i === currentPage) {
            paging.push(i); // add brackets to indicate current page
        } else {
            paging.push(i);
        }
    }
    return paging;
}