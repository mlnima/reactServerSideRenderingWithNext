import React, {useState} from 'react';
import Image from 'next/image'
import {checkRemovedContent} from "../../../_variables/ajaxPostsVariables";
import {clientSelfWidgetUpdate} from "../../../_variables/_ajaxClientWidgetVariables";
import styled from "styled-components";

const NextImageRendererStyledDiv = styled.div`
  .post-element-image, .meta-element-image, .post-element-image > div > img, .meta-element-image > div > img {
    width: 48vw;
    position: relative;
  }

  .post-element-list, .post-element-list > div > img {
    width: 116.6px;
    height: 65.1px;
  }

  .logo-image, .logo-image > div > img {
    width: 300px;
    height: 100px;
    max-width: 300px;
    max-height: 100px;
    position: relative;
  }

  .no-image-title {
    font-size: 2rem;
  }
`



const ImageRendererStyledDiv = styled.div`
  .post-element-image {

  }

  img {
    width: 48vw;
    height: 27.01vw;
    object-fit: cover;
  }

  .post-element-list, .post-element-list > div > img {
    width: 116.6px;
    height: 65.1px;
  }

  .logo-image, .logo-image > div > img {
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 200px;
    position: relative;
  }

  @media only screen and (min-width: 768px) {
    .post-element-image, .meta-element-image, .post-element-image > div > img, .meta-element-image > div > img {
      width: ${props=>props?.imageSize?.width || 255.8}px;
      height: ${props=>props?.imageSize?.height || 143.95}px;
    }
  }
`


const ImageRenderer = props => {
    const [gotError, setGotError] = useState(false)
    const [isReported, setIsReported] = useState(false)
    const [imageUrl, setImageUrl] = useState(() => {
        return props?.imageUrl ? props.imageUrl?.includes('http') ? props.imageUrl : process.env.NEXT_PUBLIC_PRODUCTION_URL + props.imageUrl : ''
    })

    const noImageUrl = '/static/images/noImage/no-image-available.png'
    //const isImageAbsolutePath = imageUrl?.includes('http')
    // const validImageForNextImage = (((process.env.NEXT_PUBLIC_ALLOWED_IMAGES_SOURCES ?? ' ').split(' ').includes(imageUrl?.includes('http') ? new URL(imageUrl).hostname : undefined)) || !isImageAbsolutePath) && props.postElementImageLoader === 'next'
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
                checkRemovedContent(data).then(() => {
                    if (props.widgetId) {
                        clientSelfWidgetUpdate(props.widgetId)
                    }
                })
            }, 1000)
        }
    }

    if (validImageForNextImage) {
        return (
            <NextImageRendererStyledDiv className={props.classNameValue} imageSize={props.imageSize}>
                {imageUrl ?
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
                    /> :
                    <p className='no-image-title'>{props.title}</p>
                }
            </NextImageRendererStyledDiv>
        )
    } else return (
        <ImageRendererStyledDiv className={props.classNameValue} imageSize={props.imageSize}>

            {imageUrl ?
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


        </ImageRendererStyledDiv>

    );
};
export default ImageRenderer;
