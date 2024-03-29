const fileTypeDetector =( fileName :string) => {
    const splitFileName = fileName.split('.')
    const fileFormat = splitFileName[splitFileName?.length - 1].toLowerCase()
    let finalFormat = ''
    const fileFormats = {
        image: ['jpg', 'png', 'jpeg', 'svg','webp','gif'],
        video: ['mp4', '3gp', 'mov'],
        document: ['js', 'css', 'env', 'scss', 'txt'],
        application: ['exe'],
        archive: ['zip', 'rar']
    }
    Object.keys(fileFormats).forEach((formatArr:string) => {
        //@ts-ignore
        if (fileFormats?.[formatArr].includes(fileFormat)) {
            finalFormat = formatArr
        }
    })
    return finalFormat
}

export default fileTypeDetector