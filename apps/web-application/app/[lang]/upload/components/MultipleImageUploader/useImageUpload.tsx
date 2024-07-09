import { useState } from 'react';


interface PropTypes{
    images: File[];
    setImages: (images: File[]) => void;
    //@ts-ignore
    handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const useImageUpload = (onUploadComplete: (images: File[]) => void,): PropTypes => {
    const [images, setImages] = useState<File[]>([]);

    const handleFileSelect = (event: any) => {
        const selectedFiles = event.target.files || event.dataTransfer.files;

        if (!selectedFiles?.length) {
            return;
        }

        const newImages = Array.from(selectedFiles);
        //@ts-ignore
        setImages((prevImages) => [...prevImages, ...newImages]);
        //@ts-ignore
        onUploadComplete([...images, ...newImages]);
    };

    return { images, setImages, handleFileSelect };
};
