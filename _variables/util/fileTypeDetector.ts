const fileTypeDetector = fileName => {
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
    Object.keys(fileFormats).forEach(formatArr => {
        if (fileFormats[formatArr].includes(fileFormat)) {
            finalFormat = formatArr
        }
    })
    return finalFormat
}

export default fileTypeDetector