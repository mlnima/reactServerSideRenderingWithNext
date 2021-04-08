import React, {useState, useMemo, useEffect} from 'react';
import Image from 'next/image'
import {checkRemovedContent} from "../../../_variables/ajaxPostsVariables";

const ImageRenderer = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const isImageAbsolutePath = props.imageUrl?.includes('http')
    const validImageForNextImage = ((process.env.REACT_APP_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(props.imageUrl?.includes('http') ? new URL(props.imageUrl).hostname : undefined)) || !isImageAbsolutePath
    const noImageUrl = '/static/images/noImage/no-image-available.png';

    const onErrorHandler = () => {

        if (props.contentId && props.imageUrl && !isReported) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: props.imageUrl,
                contentId: props.contentId
            }
            setTimeout(() => {
                checkRemovedContent(data)
            }, 0)
        }
    }

    if (validImageForNextImage) {
        return <Image
            src={gotError ? noImageUrl : props.imageUrl}
            alt={props.altValue || props.classNameValue}
            onError={onErrorHandler}
            onMouseEnter={props.hoverHandler}
            onTouchStart={props.hoverHandler}
            className={props.classNameValue}
            layout={props.layout || 'intrinsic'}
            width={props.imageWidth || 300}
            height={props.imageHeight || 300 / 1.777}
            quality={props.quality || 80}
            loading={props.loading || 'lazy'}

        />
    } else return (
        <img className={props.classNameValue}
             alt={props.altValue || props.classNameValue}
             width={props.imageWidth || 300}
             height={props.imageHeight || 300 / 1.777}
             onMouseEnter={props.hoverHandler}
             onTouchStart={props.hoverHandler}
             src={gotError ? noImageUrl : props.imageUrl}
             onError={onErrorHandler}/>
    );
};
export default ImageRenderer;
