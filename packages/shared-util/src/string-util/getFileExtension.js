const getFileExtension = (fileName: string) => {
    try {
        return fileName.slice((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    } catch (error) {
        return fileName
    }

}

export default getFileExtension