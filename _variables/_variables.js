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
    return name.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + name.replace(/([A-Z])/g, " $1").slice(1)
}

export const fileTypeDetector =   fileName => {

    const splitFileName = fileName.split('.')
    const fileFormat = splitFileName[splitFileName.length - 1].toLowerCase()
    let finalFormat = ''
    const fileFormats = {
        image: [ 'jpg', 'png', 'jpeg', 'svg' ],
        video: [ 'mp4', '3gp' ],
        document: [ 'js', 'css', 'env', 'scss' ],
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

