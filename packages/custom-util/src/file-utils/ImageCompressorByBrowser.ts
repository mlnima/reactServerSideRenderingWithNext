import imageCompression from 'browser-image-compression';

const ImageCompressorByBrowser = async (imageFile: File) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType:'image/webp'
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);

    }catch (error) {
        console.log(error)
    }
}

export default ImageCompressorByBrowser;