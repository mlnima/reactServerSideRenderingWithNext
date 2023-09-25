'use client';
import React, { useState } from 'react';
import { ImageList } from './ImageList';
import {Post} from "typescript-types";

export interface ImageListWithPreviewProps {
    removeImage: Function;
    editingPost: Post,
    setEditingPost: Function;
}

export const ImageListWithPreview: React.FC<ImageListWithPreviewProps> = (
    {
        removeImage,
        editingPost,
        setEditingPost,

    }) => {
    const [previewImage, setPreviewImage] = useState<File | null>(null);
    const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({ });

    return (
        <div>
            {/*//@ts-ignore*/}
            <ImageList editingPost={editingPost}
                       setEditingPost={setEditingPost}
                       removeImage={removeImage}
                       setPreviewImage={setPreviewImage}
                       setPreviewStyle={setPreviewStyle} />
        </div>
    );
};
