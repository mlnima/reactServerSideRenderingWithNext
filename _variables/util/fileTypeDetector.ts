
// interface fileTypeDetectorTypes{
//     image:string[],
//     video:string[],
//     document:string[],
//     application:string[],
//     archive:string[],
// }


const fileTypeDetector =( fileName :string) => {
    const splitFileName = fileName.split('.')
    const fileFormat = splitFileName[splitFileName?.length - 1].toLowerCase()
    let finalFormat = ''
    const fileFormats = {
        image: ['jpg', 'png', 'jpeg', 'svg'],
        video: ['mp4', '3gp'],
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