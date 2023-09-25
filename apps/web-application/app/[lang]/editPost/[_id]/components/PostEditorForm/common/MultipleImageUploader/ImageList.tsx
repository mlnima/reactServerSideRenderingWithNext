'use client';
import React from 'react';
import {ImageItem} from './ImageItem';
import {Post} from "typescript-types";
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

export interface ImageListProps {
    setPreviewImage: Function;
    setPreviewStyle: Function;
    editingPost: Post,
    setEditingPost: Function;
    removeImage: Function;
}

interface EditingPost {
    images?: { filePath: string }[];
    [key: string]: any;
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

        setEditingPost((prevState: EditingPost) => {
            return {
                ...prevState,
                //@ts-ignore
                mainThumbnail: newImages?.[0]?.filePath,
                images: newImages
            };
        });
    };

    // const moveImage = (from: number, to: number) => {
    //     const newImages = [...(editingPost?.images || [])];
    //     newImages.splice(to, 0, newImages.splice(from, 1)[0]);
    //     setEditingPost((prevState:any) => {
    //
    //         return({
    //                 ...prevState,
    //             mainThumbnail:newImages?.[0]?.filePath,
    //             images: newImages
    //         })
    //     })
    // };

    return (
        <div>
            {(editingPost?.images || []).map((image, index) => (
                <ImageItem key={uuidv4()}
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


//    setEditingPost((prevState:{[key:string]:any}) => ({...prevState, images: newImages}))