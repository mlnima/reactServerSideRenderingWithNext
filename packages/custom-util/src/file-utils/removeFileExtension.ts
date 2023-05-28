const removeFileExtension = async (fileName:string) => {
    return new Promise((resolve, reject) => {
        const index = fileName.lastIndexOf('.');
        if (index > 0 && index < fileName.length - 1) {
            const fileNameWithoutExtension = fileName.substring(0, index);
            resolve(fileNameWithoutExtension);
        } else {
            reject(new Error('File name has no extension.'));
        }
    });
};

export default removeFileExtension;