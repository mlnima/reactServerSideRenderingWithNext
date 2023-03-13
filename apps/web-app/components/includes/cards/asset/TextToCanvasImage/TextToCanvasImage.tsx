import {FC, useEffect, useRef} from 'react'
import styled from "styled-components";

interface TextToCanvasImagePropTypes {
    title?: string,
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

interface TextToCanvasImageStylePropTypes {
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

const TextToCanvasImageStyle = styled.div`

  width: 100%;
  height: ${({numberOfCardsPerRowInMobile}: TextToCanvasImageStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw;
  aspect-ratio: 16 / 9;
  position: relative;
  canvas {
    width: 100%;
    height: ${({numberOfCardsPerRowInMobile}: TextToCanvasImageStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw !important;
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
         numberOfCardsPerRowInMobile,
         title,
         cardWidth,
     }) => {
        const canvasElement = useRef<HTMLCanvasElement | null>(null)

        useEffect(() => {
            if (canvasElement?.current && title){
                const ctx = canvasElement?.current?.getContext('2d')
                //@ts-ignore
                ctx.font = '30px serif';
                //@ts-ignore
                ctx.fillStyle = '#fff';
                //@ts-ignore
                ctx.fillText(title.substring(0,15) + '...',50,(cardWidth / 1.777)/2);
            }
        }, [canvasElement?.current]);

        return (
            <TextToCanvasImageStyle numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                    cardWidth={cardWidth}
                                    className={'card-image'}>
                <canvas ref={canvasElement}/>

            </TextToCanvasImageStyle>
        )
    };
export default TextToCanvasImage
