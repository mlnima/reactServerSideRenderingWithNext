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
   return name?
     name.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + name.replace(/([A-Z])/g, " $1").slice(1):
       ''
}

export const fileTypeDetector =   fileName => {

    const splitFileName = fileName.split('.')
    const fileFormat = splitFileName[splitFileName.length - 1].toLowerCase()
    let finalFormat = ''
    const fileFormats = {
        image: [ 'jpg', 'png', 'jpeg', 'svg' ],
        video: [ 'mp4', '3gp' ],
        document: [ 'js', 'css', 'env', 'scss','txt' ],
        application:['exe'],
        archive:['zip','rar']
    }
    // const images = [ '.jpg', '.png', 'jpeg', 'svg' ]
    // const video = [ '.mp4', '.3gp' ]
    // const documents = [ '.js', '.css', '.env', '.scss' ]
    Object.keys(fileFormats).forEach(  formatArr=>{
        if (fileFormats[formatArr].includes(fileFormat)){
            finalFormat = formatArr
        }
    })
    // console.log(finalFormat )

  return finalFormat
}

export const initGA = () => {
    console.log('GA init')
    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)
}
export const logPageView = () => {
    console.log(`Logging pageview for ${window.location.pathname}`)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
}
export const logEvent = (category = '', action = '') => {
    if (category && action) {
        ReactGA.event({ category, action })
    }
}
export const logException = (description = '', fatal = false) => {
    if (description) {
        ReactGA.exception({ description, fatal })
    }
}