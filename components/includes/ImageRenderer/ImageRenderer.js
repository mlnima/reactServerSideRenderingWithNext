import React, {useState,useEffect} from 'react';
import Image from 'next/image'

const ImageRenderer = props => {
    const [gotError,setGotError]=useState(false)
    let imageUrl = props.imageUrl;
    const isImageAbsolutePath = imageUrl?.includes('http')
    const validImageForNextImage = ((process.env.REACT_APP_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(imageUrl?.includes('http') ? new URL(imageUrl).hostname : undefined)) || !isImageAbsolutePath
    const noImageUrl = '/static/images/noImage/no-image-available.png';

    if (validImageForNextImage) {
        return <Image
                  src={ gotError? noImageUrl:imageUrl}
                  alt={props.altValue || props.classNameValue }
                  onError={()=> setGotError(true)}
                  onMouseEnter={props.hoverHandler}
                  onTouchStart={props.hoverHandler}
                  className={props.classNameValue}
                  layout={props.layout || 'intrinsic'}
                  width={props.imageWidth || 300}
                  height={props.imageHeight || 300/1.777}
                  quality={props.quality ||80}
                  loading={props.loading||'lazy'}

        />
    } else return (
        <img className={props.classNameValue}
             alt={props.altValue || props.classNameValue }
             width={props.imageWidth || 300}
             height={props.imageHeight || 300/1.777}
             onMouseEnter={props.hoverHandler}
             onTouchStart={props.hoverHandler}
             src={ gotError? noImageUrl:imageUrl}
             onError={()=> setGotError(true)}/>
    );
};
export default ImageRenderer;
