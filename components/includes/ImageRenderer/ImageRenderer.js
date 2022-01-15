import React, {useState} from 'react';
import styled from "styled-components";

const ImageRendererStyledDiv = styled.div`

  // img {
  //   width: 48vw;
  //   height: 27.01vw;
  //   object-fit: cover;
  // }
  //
  // .post-element-list, .post-element-list > div > img {
  //   width: 116.6px;
  //   height: 65.1px;
  // }
  //
  // .logo-image, .logo-image > div > img {
  //   width: 100%;
  //   height: 100%;
  //   max-width: 200px;
  //   max-height: 200px;
  //   position: relative;
  // }
  //
  // @media only screen and (min-width: 768px) {
  //   .post-element-image, .meta-element-image, .post-element-image > div > img, .meta-element-image > div > img {
  //     width: ${props => props?.imageSize?.width || 255.8}px;
  //     height: ${props => props?.imageSize?.height || 143.95}px;
  //   }
  // }
`


const ImageRenderer = props => {
    const [gotError, setGotError] = useState(false)

    const noImageUrl = '/static/images/noImage/no-image-available.png'

    return (
        <ImageRendererStyledDiv className={props.classNameValue} imageSize={props.imageSize}>
            {props?.imageUrl ?
                <img className={props.classNameValue}
                     alt={props.altValue || props.classNameValue}
                     onMouseEnter={props.hoverHandler}
                     onMouseOver={props.hoverHandler}
                     onTouchStartCapture={props.hoverHandler}
                     onTouchEnd={props.hoverHandler}
                     src={!gotError ? props?.imageUrl || noImageUrl : noImageUrl}
                     onError={()=>setGotError(true)}
                /> :
                <p className='no-image-title'>
                    {props.title}
                </p>
            }
        </ImageRendererStyledDiv>
    );
};
export default ImageRenderer;
