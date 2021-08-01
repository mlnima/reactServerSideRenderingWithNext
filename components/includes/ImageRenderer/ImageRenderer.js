import React, {useState, useMemo, useEffect} from 'react';
import Image from 'next/image'
import {checkRemovedContent} from "../../../_variables/ajaxPostsVariables";
import {clientSelfWidgetUpdate} from "../../../_variables/_ajaxClientWidgetVariables";

const ImageRenderer = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const [imageUrl,setImageUrl] = useState(()=>{
        return  props?.imageUrl ? props.imageUrl?.includes('http') ? props.imageUrl : process.env.REACT_APP_PRODUCTION_URL + props.imageUrl : ''
    })

    const noImageUrl= '/static/images/noImage/no-image-available.png'
    //const isImageAbsolutePath = imageUrl?.includes('http')
   // const validImageForNextImage = (((process.env.REACT_APP_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(imageUrl?.includes('http') ? new URL(imageUrl).hostname : undefined)) || !isImageAbsolutePath) && props.postElementImageLoader === 'next'
    const validImageForNextImage = false

    const onErrorHandler = e => {
        if (imageUrl) {
            setGotError(true)
            setIsReported(true)
            let data = {
                checkUrl: imageUrl,
                contentId: props.contentId,
                type: 'image'
            }
            setTimeout(() => {
                checkRemovedContent(data)
                clientSelfWidgetUpdate(props.widgetId)
            }, 1000)
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
                    .no-image-title{
                      font-size: 2rem;
                    }
                `}</style>
                { imageUrl ?
                    <Image
                        src={!gotError ? imageUrl || noImageUrl : noImageUrl}
                        alt={props.altValue || props.classNameValue}
                        onError={e => {
                            onErrorHandler(e)
                            setGotError(true)
                        }}
                        onMouseEnter={props.hoverHandler}
                        onTouchStart={props.hoverHandler}
                        {...props.imageSize}
                        layout={props.layout || 'fill'}
                        quality={props.quality || 100}
                        loading={props.loading || 'eager'}
                    />:
                    <p className='no-image-title'>{props.title}</p>
                }
            </div>
        )
    } else return (
        <div className={props.classNameValue}>
            <style jsx>{`
                .post-element-image{
                
                }
                img{
                    width:48vw;
                    height: 27.01vw;
                    object-fit:cover;
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
                        width: ${props.imageSize?.width}px;
                        height: ${props.imageSize?.height}px;
                    }
                }
                
            `}</style>
            { imageUrl ?
                <img className={props.classNameValue}
                     alt={props.altValue || props.classNameValue}
                     onMouseEnter={props.hoverHandler}
                     onMouseOver={props.hoverHandler}
                     onTouchStartCapture={props.hoverHandler}
                     onTouchEnd={props.hoverHandler}
                     src={!gotError ? imageUrl || noImageUrl : noImageUrl}
                     onError={e => {
                         onErrorHandler(e)
                         setGotError(true)
                     }}/> :
                <p className='no-image-title'>{props.title}</p>

            }



        </div>

    );
};
export default ImageRenderer;
