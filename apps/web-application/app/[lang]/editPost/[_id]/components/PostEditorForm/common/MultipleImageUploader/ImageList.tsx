'use client';
import React from 'react';
import {ImageItem} from './ImageItem';
import {Post} from "typescript-types";

export interface ImageListProps {
    setPreviewImage: (file: any | null) => void;
    setPreviewStyle: (style: React.CSSProperties) => void;
    editingPost: Post,
    setEditingPost: (postData: any) => void;
    removeImage: (index: number) => void;
}

export const ImageList: React.FC<ImageListProps> = (
    {
        setPreviewImage,
        setPreviewStyle,
        editingPost,
        setEditingPost,
        removeImage
    }) => {

    const moveImage = (from: number, to: number) => {
        const newImages = [...(editingPost?.images || [])];
        newImages.splice(to, 0, newImages.splice(from, 1)[0]);
        setEditingPost((prevState:{[key:string]:any}) => ({...prevState, images: newImages}))
    };

    return (
        <div>
            {(editingPost?.images || []).map((image, index) => (
                <ImageItem key={index + Date.now()}
                           removeImage={removeImage}
                           image={image}
                           index={index}
                           moveImage={moveImage}
                           setPreviewImage={setPreviewImage}
                           setPreviewStyle={setPreviewStyle}/>
            ))}
        </div>
    );
};
