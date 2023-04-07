import React from 'react';
import { usePreview } from 'react-dnd-preview';
import { ImagePreviewWrapper } from './ImagePreviewWrapper';

export interface ImagePreviewProps {
    style: React.CSSProperties;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ style }) => {
    //@ts-ignore
    const { display, itemType, item, style: previewStyle } = usePreview();

    if (itemType !== 'image' || !item) {
        return null;
    }

    return (
        <ImagePreviewWrapper style={{ ...style, ...previewStyle }}>
            <img src={URL.createObjectURL((item as any).file)} alt="" />
        </ImagePreviewWrapper>
    );
};
