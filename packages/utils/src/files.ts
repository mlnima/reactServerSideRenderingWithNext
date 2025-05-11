import imageCompression from 'browser-image-compression';

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Expected result to be a string');
      }
    };

    reader.onerror = e => reject('FileReader error: ' + e);

    reader.readAsDataURL(blob);
  });
};

export const imageCanvasCompressor = async ({ image, maxWidth = 640, maxHeight = 640, outputType = 'base64',fileName='compressed_image.webp' }: {
  image: Blob;
  maxWidth?: number;
  maxHeight?: number;
  outputType?: string;
  fileName?: string
}): Promise<string | File> => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const MAX_WIDTH = maxWidth;
          const MAX_HEIGHT = maxHeight;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas context not available.'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);

          if (outputType === 'base64') {
            const dataUrl = canvas.toDataURL('image/webp', 1);
            resolve(dataUrl);
          } else {
            canvas.toBlob(
              blob => {
                if (!blob) {
                  reject(new Error('Compression failed.'));
                  return;
                }
                const file = new File([blob], fileName, {
                  type: 'image/webp',
                });
                resolve(file);
              },
              'image/webp',
              0.7,
            );
          }
        };

        if (event.target){
          img.src = event.target.result as string;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ImageCompressorByBrowser = async (imageFile: File): Promise<void> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp',
  };
  try {
    await imageCompression(imageFile, options);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeFileExtension = async (fileName: string): Promise<string> => {
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