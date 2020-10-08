import ReactGA from 'react-ga'

export const likeValueCalculator = (likes, dislikes) => {
    return (likes > 0 && dislikes > 0) ? (Math.round((likes * 100) / (likes + dislikes)))
        : (likes === 0 && dislikes === 0) ? 0
            : (likes === 0 && dislikes > 0) ? 0
                : (likes > 0 && dislikes === 0) ? 100
                    : 0;

}

export const getAbsolutePath = async (req) => {
    return await req.protocol + '://' + await req.get('Host')
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
    // console.log(finalFormat )

    return finalFormat
}

export const initGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
}
export const logPageView = () => {
    // console.log(`Logging pageview for ${window.location.pathname}`)
    ReactGA.set({page: window.location.pathname})
    ReactGA.pageview(window.location.pathname)
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
        console.log(searchParams.toString())
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