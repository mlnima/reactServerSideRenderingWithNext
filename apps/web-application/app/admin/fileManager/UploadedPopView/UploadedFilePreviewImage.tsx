'use client';
import { FC } from "react";

interface UploadedFilePreviewImagePropType {
    filePath: string
}

const UploadedFilePreviewImage: FC<UploadedFilePreviewImagePropType> = ({ filePath }) => {
    return (
        <div className='uploaded-pop-view-image'>
            <img className='uploaded-pop-view-image-element'
                 src={process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + filePath.replace('./', '')}
            />
        </div>
    );
};

export default UploadedFilePreviewImage;