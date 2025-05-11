'use client';
import { FC } from "react";

interface UploadedFilePreviewVideoPropType {
    filePath: string
}

const UploadedFilePreviewVideo: FC<UploadedFilePreviewVideoPropType> = ({ filePath }) => {
    return (
        <div className='uploaded-pop-view-video'>
            <video className='uploaded-pop-view-video-element' controls>
                <source src={process.env.NEXT_PUBLIC_PRODUCTION_URL + '/' + filePath.replace('./', '')} />
            </video>
        </div>
    );
};

export default UploadedFilePreviewVideo;