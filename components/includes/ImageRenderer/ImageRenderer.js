import React, {useState, useMemo, useEffect} from 'react';
import Image from 'next/image'
import {checkRemovedContent} from "../../../_variables/ajaxPostsVariables";

const ImageRenderer = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const isImageAbsolutePath = props.imageUrl?.includes('http')
    const validImageForNextImage = ((process.env.REACT_APP_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(props.imageUrl?.includes('http') ? new URL(props.imageUrl).hostname : undefined)) || !isImageAbsolutePath
    const noImageUrl = '/static/images/noImage/no-image-available.png';

    const onErrorHandler = e => {
        console.log('error', e)
        console.log(props.imageUrl)
        if (props.imageUrl) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: props.imageUrl,
                contentId: props.contentId,
                type: 'image'
            }
            setTimeout(() => {
                checkRemovedContent(data)
            }, 0)
        }
    }

    if (validImageForNextImage) {
        return (
            <div className={props.classNameValue}>
                <style jsx>{`
            .post-element-image,.meta-element-image,.post-element-image>div>img,.meta-element-image>div>img{
            position: relative;
            width: 100%;
            aspect-ratio:16/9;
            }
            `}</style>

                <Image
                    src={!gotError ? props.imageUrl || noImageUrl : noImageUrl}
                    alt={props.altValue || props.classNameValue}
                    onError={e => {
                        onErrorHandler(e)
                        setGotError(true)
                    }}
                    onMouseEnter={props.hoverHandler}
                    onTouchStart={props.hoverHandler}
                    layout={props.layout || 'intrinsic'}
                    quality={props.quality || 80}
                    loading={props.loading || 'lazy'}
                />
            </div>
        )
    } else return (
        <div className={props.classNameValue}>
            <style jsx>{`
            .post-element-image{
         
            width: 100%;
            aspect-ratio:16/9;
            }
            `}</style>
            <img className={props.classNameValue}
                 alt={props.altValue || props.classNameValue}
                // width={props.imageWidth || 300}
                // height={props.imageHeight || 300 / 1.777}
                 onMouseEnter={props.hoverHandler}
                 onTouchStart={props.hoverHandler}
                 src={!gotError ? props.imageUrl || noImageUrl : noImageUrl}
                 onError={e => {
                     onErrorHandler(e)
                     setGotError(true)
                 }}/>
        </div>

    );
};
export default ImageRenderer;
