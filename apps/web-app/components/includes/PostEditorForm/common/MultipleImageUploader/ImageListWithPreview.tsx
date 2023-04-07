import React, { useState } from 'react';
import { ImageList } from '@components/includes/PostEditorForm/common/MultipleImageUploader/ImageList';
import {Post} from "typescript-types";
// import { ImageListWrapper } from './ImageListWrapper';
// import { ImagePreviewWrapper } from '@components/includes/PostEditorForm/common/MultipleImageUploader/ImagePreviewWrapper';

export interface ImageListWithPreviewProps {
    removeImage: (index: number) => void;
    postData: Post,
    setPostData: (postData: any) => void;
}

export const ImageListWithPreview: React.FC<ImageListWithPreviewProps> = (
    {
        removeImage,
        postData,
        setPostData,

    }) => {
    const [previewImage, setPreviewImage] = useState<File | null>(null);
    const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({ });


    return (
        <div>
            {/*//@ts-ignore*/}
            <ImageList postData={postData}
                       setPostData={setPostData}
                       removeImage={removeImage}
                       setPreviewImage={setPreviewImage}
                       setPreviewStyle={setPreviewStyle} />
            {/*{previewImage && (*/}
            {/*    <ImagePreviewWrapper style={previewStyle}>*/}
            {/*        <img src={URL.createObjectURL(previewImage)} alt="" style={{ width: '180px', height: '180px', objectFit: 'cover',zIndex:101 }} />*/}
            {/*    </ImagePreviewWrapper>*/}
            {/*)}*/}
        </div>
    );
};


// import React, { useState } from 'react';
// import { ImageItem, ImageItemProps } from './ImageItem';
// import { PreviewImageWrapper } from './PreviewImageWrapper';
//
// export const ImageListWithPreview: React.FC<Omit<ImageItemProps, 'setPreviewImage' | 'setPreviewStyle'>> = (props) => {
//     const [previewImage, setPreviewImage] = useState<File | null>(null);
//     const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});
//
//     const imageList = (
//         <div>
//             {[...Array(props.files.length)].map((_, index) => (
//                 <ImageItem key={index} index={index} {...props} setPreviewImage={setPreviewImage} setPreviewStyle={setPreviewStyle} />
//             ))}
//         </div>
//     );
//
//     return (
//         <>
//             {imageList}
//             {previewImage && (
//                 <PreviewImageWrapper style={previewStyle}>
//                     <img src={URL.createObjectURL(previewImage)} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
//                 </PreviewImageWrapper>
//             )}
//         </>
//     );
// };
