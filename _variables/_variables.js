import React from "react";

export const clickPathGenerator = (clickedItemName, pathFromContexts) => {
    if (pathFromContexts === '.') {
        return './' + clickedItemName
    } else {
        return pathFromContexts + '/' + clickedItemName
    }
};

export const setLanguageToLocalStorage = (language) => {
    localStorage ? localStorage.setItem('lang', language) : null
}

export const languagesOptions = (process.env.NEXT_PUBLIC_LOCALS.split(' ').filter(lang=>lang!== process.env.NEXT_PUBLIC_DEFAULT_LOCAL) || []).map(lang => {
    return (
        <option key={lang} value={lang}>{lang}</option>
    )
})

// export const queryToObject = (query) => {
//     let finalObject = {}
//     const splitByAnd = query.split('&')
//     for (let q of splitByAnd) {
//         const splitByEqual = q.split('=')
//         finalObject[splitByEqual[0]] = splitByEqual[1]
//     }
//     return finalObject
// }

// export const getLanguageQuery = (url) => {
//     const searchParams = new URLSearchParams(url);
//     if (searchParams.has('lang')) {
//         return {lang: searchParams.get('lang')}
//     } else return null
// }

// export const getLanguageQueryFromWindowLocationSearch = () => {
//     if (process.browser) {
//         const spitUrl = window.location.search.split('?')
//         const searchParams = new URLSearchParams('?' + spitUrl[1]);
//         if (searchParams.has('lang')) {
//             return {lang: searchParams.get('lang')}
//         } else return null
//     } else return null
// }

// export const addOrReplaceQueryToWindowLocationSearch = (queryName, queryValue) => {
//     if (process.browser) {
//         const searchParams = new URLSearchParams(window.location.search);
//         searchParams.set(queryName, queryValue)
//         return searchParams.toString()
//     } else return null
// }



// export const getLanguageFromLocalStorage = () => {
//     return localStorage ? localStorage.lang ? localStorage.lang : 'default' : 'default'
// }

// export const pathAndAsPathGenerator = (pathname, asPath, query) => {
//     const data = {
//         pathname: '',
//         asPath: '',
//         query
//     }
//     asPath.includes('/tags/') || asPath.includes('/categories/') || asPath.includes('/actors/') ? data.pathname = '/posts' :
//         asPath.includes('/tags') || asPath.includes('/categories') || asPath.includes('/actors') ? data.pathname = '/meta' : data.pathname = pathname;
//     if (asPath.includes('?')) {
//         const asPathSplit = asPath.split('?')
//         const searchParams = new URLSearchParams(asPathSplit[1]);
//         if (localStorage.lang && localStorage.lang !== 'default') {
//
//             searchParams.set('lang', localStorage.lang)
//
//             if (query.page) {
//                 searchParams.set('page', query.page)
//             }
//             data.query = {
//                 ...data.query,
//                 lang: localStorage.lang
//             }
//         } else if (localStorage.lang === 'default' && asPath.includes('lang=')) {
//             const page = query ? query.page ? `&page=${query.page}` : '' : ''
//             data.asPath = asPathSplit[0] + '?' + searchParams.toString() + page
//             searchParams.delete('lang')
//
//
//         }
//
//     } else {
//
//         if (localStorage.lang && localStorage.lang !== 'default') {
//             const page = query ? query.page ? `&page=${query.page}` : '' : ''
//             data.asPath = asPath + '?lang=' + localStorage.lang + page
//             data.pathname = pathname
//         } else if (localStorage.lang === 'default') {
//             const page = query.page ? `?page=${query.page}` : ''
//             data.asPath = asPath + page
//             data.pathname = pathname
//         }
//     }
//     return data
// }

// export const jsonExporter = (data,fileName)=>{
//     const contentType = "application/json;charset=utf-8;";
//     if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//         let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], {type: contentType});
//         navigator.msSaveOrOpenBlob(blob, fileName);
//
//     } else {
//         let a = document.createElement('a');
//         a.download = fileName;
//         a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
//         a.target = '_blank';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//
//     }
// }




