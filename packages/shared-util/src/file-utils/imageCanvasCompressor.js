interface IProps {
    image: File | null,
    maxWidth?: number,
    maxHeight?: number,
    outputType?: 'base64' | 'file', // Add this line
}

const imageCanvasCompressor = async <T extends 'base64' | 'file'>(
    { image, maxWidth = 640, maxHeight = 640, outputType = 'base64' as T }: IProps
): Promise<T extends 'base64' ? string : Blob> => {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
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
                    ctx!.drawImage(img, 0, 0, width, height);

                    if (outputType === 'base64') {
                        const dataUrl = canvas.toDataURL('image/webp', 1);  // Changed to WebP
                        resolve(dataUrl as any);
                    } else {
                        // Convert canvas to Blob and then to File
                        canvas.toBlob(blob => {
                            if (!blob) {
                                reject(new Error('Compression failed.'));
                                return;
                            }
                            const file = new File([blob], 'compressed_image.webp', {  // Changed to WebP
                                type: 'image/webp',  // Changed to WebP
                            });
                            resolve(file as any);
                        }, 'image/webp', 0.7);  // Changed to WebP
                    }
                };
                img.src = event.target!.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(image!);
        });
    } catch (error) {
        console.log(error);
    }
};

export default imageCanvasCompressor;




// interface IProps {
//     image: File | null,
//     maxWidth?: number,
//     maxHeight?: number,
// }
//
// const imageCanvasCompressor = async ({image, maxWidth = 640, maxHeight = 640}: IProps) => {
//     try {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 const img = new Image();
//                 img.onload = () => {
//                     const canvas = document.createElement('canvas');
//                     const MAX_WIDTH = maxWidth;
//                     const MAX_HEIGHT = maxHeight;
//                     let width = img.width;
//                     let height = img.height;
//
//                     if (width > height) {
//                         if (width > MAX_WIDTH) {
//                             height *= MAX_WIDTH / width;
//                             width = MAX_WIDTH;
//                         }
//                     } else {
//                         if (height > MAX_HEIGHT) {
//                             width *= MAX_HEIGHT / height;
//                             height = MAX_HEIGHT;
//                         }
//                     }
//
//                     canvas.width = width;
//                     canvas.height = height;
//                     const ctx = canvas.getContext('2d');
//                     //@ts-ignore
//                     ctx.drawImage(img, 0, 0, width, height);
//
//                     const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
//                     resolve(dataUrl);
//                 };
//                 //@ts-ignore
//                 img.src = event.target.result;
//             };
//             reader.onerror = reject;
//             //@ts-ignore
//             reader.readAsDataURL(image);
//         });
//
//
//     } catch (error) {
//         console.log(error)
//     }
// }
//
// export default imageCanvasCompressor;