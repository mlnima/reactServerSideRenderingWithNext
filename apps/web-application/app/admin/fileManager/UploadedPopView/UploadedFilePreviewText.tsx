'use client';
import React from "react";

interface UploadedFilePreviewTextPropType {
    file: string
}

const UploadedFilePreviewText: React.FC<UploadedFilePreviewTextPropType> = ({ file }) => {
    return (
        <div className='uploaded-pop-view-text'>
            <textarea className='uploaded-pop-view-text-element' value={file} readOnly />
        </div>
    );
};

export default UploadedFilePreviewText;