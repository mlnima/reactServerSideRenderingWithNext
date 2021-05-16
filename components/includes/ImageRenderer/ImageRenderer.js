import React, {useState, useMemo, useEffect} from 'react';
import Image from 'next/image'
import {checkRemovedContent} from "../../../_variables/ajaxPostsVariables";

const ImageRenderer = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const isImageAbsolutePath = props.imageUrl?.includes('http')
    const validImageForNextImage = (((process.env.REACT_APP_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(props.imageUrl?.includes('http') ? new URL(props.imageUrl).hostname : undefined)) || !isImageAbsolutePath) && props.postElementImageLoader === 'next'
    const noImageUrl = '/static/images/noImage/no-image-available.png';
    console.log(props)
    const imageWidth = props.postElementSize === 'list' ? 116.6 :
        props.postElementSize === 'smaller' ? 209.8 :
            props.postElementSize === 'small' ? 255 :
                props.postElementSize === 'medium' ? 320 : 255


    const onErrorHandler = e => {
        console.log('error', e)
        //   console.log(props.imageUrl)
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
width:48vw;
position: relative;
}
.post-element-list,.post-element-list>div>img{
width: 116.6px;
height: 65.1px;
}
.logo-image,.logo-image>div>img{
width: 300px;
height: 100px;
max-width: 300px;
max-height: 100px;
position: relative;
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
                    layout={props.layout || 'fill'}
                    quality={props.quality || 80}
                    loading={props.loading || 'eager'}
                />
            </div>
        )
    } else return (
        <div className={props.classNameValue}>
<style jsx>{`
.post-element-image{

}
img{
width:48vw;
}
.post-element-list,.post-element-list>div>img{
width: 116.6px;
height: 65.1px;
}
.logo-image,.logo-image>div>img{
width: 100%;
height: 100%;
max-width: 200px;
max-height: 200px;
position: relative;
}
@media only screen and (min-width: 768px) {
.post-element-image,.meta-element-image,.post-element-image>div>img,.meta-element-image>div>img{
width: ${imageWidth}px;
height: ${imageWidth / 1.777}px;
}
}
`}</style>
            <img className={props.classNameValue}
                 alt={props.altValue || props.classNameValue}
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
