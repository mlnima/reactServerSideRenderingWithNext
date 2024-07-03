// @ts-nocheck
'use client';
import React, {useRef, useEffect, useCallback} from 'react';
// import {useDrag, useDrop, useDragLayer} from 'react-dnd';
// @ts-ignore
// import throttle from 'lodash.throttle';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './ImageItem.styles.scss'

export interface ImageItemProps {
    image: any;
    index: number;
    removeImage: Function;
}

export const ImageItem: React.FC<ImageItemProps> = (
    {
        image,
        index,
        removeImage
    }) => {

    const handleRemoveImage = () => {
        removeImage(index);
    };


    return (
        <div className={"imageItem"}>
            <FontAwesomeIcon onClick={handleRemoveImage}
                             className={'remove-btn'}
                             icon={faXmark}
                             style={{width: 24, height: 24}}/>
            <img src={typeof image === 'string' ? image : image?.filePath} alt="" />
        </div>
    );
};

//style={imageStyle}