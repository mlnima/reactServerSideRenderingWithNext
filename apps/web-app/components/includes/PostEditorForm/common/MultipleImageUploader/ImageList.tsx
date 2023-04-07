import React from 'react';
import {ImageItem} from './ImageItem';
import {ImageListWrapper} from './ImageListWrapper';
import {Post} from "typescript-types";

export interface ImageListProps {
    setPreviewImage: (file: any | null) => void;
    setPreviewStyle: (style: React.CSSProperties) => void;
    postData: Post,
    setPostData: (postData: any) => void;
    removeImage: (index: number) => void;
}

export const ImageList: React.FC<ImageListProps> = (
    {
        setPreviewImage,
        setPreviewStyle,
        postData,
        setPostData,
        removeImage
    }) => {

    const moveImage = (from: number, to: number) => {
        const newImages = [...(postData?.images || [])];
        newImages.splice(to, 0, newImages.splice(from, 1)[0]);
        setPostData(prevState => ({...prevState, images: newImages}))
    };

    return (
        <ImageListWrapper>
            {(postData?.images || []).map((image, index) => (
                <ImageItem key={image.name} postData={postData} setPostData={setPostData} removeImage={removeImage}
                           image={image} index={index} moveImage={moveImage} setPreviewImage={setPreviewImage}
                           setPreviewStyle={setPreviewStyle}/>
            ))}
        </ImageListWrapper>
    );
};
