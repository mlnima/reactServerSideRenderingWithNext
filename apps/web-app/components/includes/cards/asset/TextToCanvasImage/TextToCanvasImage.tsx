import {FC, useEffect, useMemo, useRef, useState} from 'react'
import {isAbsolutePath,isImageAllowedForNextImage} from "custom-util";
import Image from 'next/image'
import styled from "styled-components";

interface TextToCanvasImagePropTypes {
    title?: string,
    postsPerRawForMobile: number,
    cardWidth: number,
}

interface TextToCanvasImageStylePropTypes {
    postsPerRawForMobile: number,
    cardWidth: number,

}

const TextToCanvasImageStyle = styled.div`

  width: 100%;
  height: ${({postsPerRawForMobile}: TextToCanvasImageStylePropTypes) => 96 / postsPerRawForMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
  position: relative;
  canvas {
    width: 100%;
    height: ${({postsPerRawForMobile}: TextToCanvasImageStylePropTypes) => 96 / postsPerRawForMobile / 1.777}vw !important;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main-text-color, #f90);
  }

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth}px;
    height: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth / 1.777}px !important;
    canvas {
      width: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth}px;
      height: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth / 1.777}px !important;
    }
  }
`


const TextToCanvasImage: FC<TextToCanvasImagePropTypes> =
    ({
         postsPerRawForMobile,
         title,
         cardWidth,
     }) => {
        const canvasElement = useRef<HTMLCanvasElement | null>(null)

        useEffect(() => {
            if (canvasElement?.current){
                const ctx = canvasElement?.current?.getContext('2d')
                ctx.font = '30px serif';
                ctx.fillStyle = '#ccc';
                ctx.fillText(title.substring(0,15) + '...',50,(cardWidth / 1.777)/2);
            }
        }, [canvasElement?.current]);

        return (
            <TextToCanvasImageStyle postsPerRawForMobile={postsPerRawForMobile}
                                    cardWidth={cardWidth}
                                    className={'card-image'}>
                <canvas ref={canvasElement}>
                </canvas>
            </TextToCanvasImageStyle>
        )
    };
export default TextToCanvasImage

// {imageUrlSource && isImageAllowedForNextImage(imageUrlSource) && index >= 2 ?
//     <Image alt={mediaAlt}
//            src={gotError || !imageUrlSource ?
//                '/asset/images/default/no-image-available.png' :
//                imageUrlSource
//            }
//            loading={'lazy'}
//            layout={'fill'}
//            className={'card-image-next'}
//            quality={80}
//            objectFit={'cover'}
//            onError={() => setGotError(true)}
//     /> :
//     <img src={gotError || !imageUrlSource ?
//         '/asset/images/default/no-image-available.png' :
//         imageUrlSource
//     }
//          alt={mediaAlt}
//          className={'card-image'}
//          onError={() => setGotError(true)}
//     />
// }