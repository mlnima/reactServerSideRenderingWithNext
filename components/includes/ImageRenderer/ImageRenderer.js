import React, {useEffect} from 'react';
import Image from 'next/image'

const ImageRenderer = props => {

    let imageUrl = props.imageUrl;
    const isImageAbsolutePath = imageUrl?.includes('http')
    const validImageForNextImage = ((process.env.REACT_APP_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(imageUrl?.includes('http') ? new URL(imageUrl).hostname : undefined)) || !isImageAbsolutePath
    const noImageUrl = '/static/images/noImage/no-image-available.png';

    if (validImageForNextImage) {
        return <Image src={imageUrl || noImageUrl}
                      onError={e => e.target.src = noImageUrl}
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
             width={props.imageWidth || 300}
             height={props.imageHeight || 300/1.777}
             onMouseEnter={props.hoverHandler}
             onTouchStart={props.hoverHandler}
             src={imageUrl || noImageUrl}
             onError={e => e.target.src = noImageUrl}/>
    );
};
export default ImageRenderer;
