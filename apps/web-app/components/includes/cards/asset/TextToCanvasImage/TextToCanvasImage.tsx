

import { FC, useEffect, useRef } from 'react';
import styled from "styled-components";

interface TextToCanvasImagePropTypes {
    title?: string,
    numberOfCardsPerRowInMobile: number,
    cardWidth: number,
}

const TextToCanvasImageStyle = styled.canvas<TextToCanvasImagePropTypes>`
  width: 100%;
  aspect-ratio: 16 / 9;

  @media only screen and (min-width: 768px) {
    width: ${({cardWidth}) => cardWidth}px;
    height: ${({cardWidth}) => cardWidth / 1.777}px;
  }
`

const TextToCanvasImage: FC<TextToCanvasImagePropTypes> =
    ({ numberOfCardsPerRowInMobile, title, cardWidth }) => {
        const canvasElement = useRef<HTMLCanvasElement | null>(null);

        const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
            const words = text.split(' ');
            const lines = [];
            let line = '';

            for(let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {

                    lines.push(line as never);
                    line = words[n] + ' ';
                }
                else {
                    line = testLine;
                }
            }
            lines.push(line as never);

            for(let j = 0, len = lines.length; j < len; j++) {
                context.fillText(lines[j], x, y - (len / 2 - j) * lineHeight);
            }
        };

        const getRandomColor = () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return {r, g, b};
        };

        const getContrast = (rgb) => {
            // Calculate the brightness difference between the background and the text (black or white)
            // If brightness difference is higher than 125, return white color. If not, return black color.
            return (Math.round(rgb.r * 299) + Math.round(rgb.g * 587) + Math.round(rgb.b * 114)) / 1000 > 125 ? '#000' : '#fff';
        };

        useEffect(() => {
            if (canvasElement?.current && title) {
                const canvas = canvasElement.current;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    const pixelRatio = window.devicePixelRatio;
                    const canvasWidth = canvas.offsetWidth * pixelRatio;
                    const canvasHeight = canvas.offsetHeight * pixelRatio;
                    const maxWidth = canvasWidth - 20; // Adding some padding
                    const lineHeight = 30 * pixelRatio; // This should be near to your font size

                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;

                    const color = getRandomColor();
                    const bgColor = `rgb(${color.r},${color.g},${color.b})`;

                    // Create gradient
                    const grd = ctx.createLinearGradient(0, 0, canvasWidth, 0);
                    grd.addColorStop(0, bgColor);
                    grd.addColorStop(1, bgColor);

                    // Fill with gradient
                    ctx.fillStyle = grd;
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

                    ctx.fillStyle = getContrast(color);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    // font size will be responsive on card width.
                    const fontSize = Math.max(Math.min(maxWidth / (ctx.measureText(title).width), canvasHeight / 2), 18 * pixelRatio);
                    ctx.font = `${fontSize}px serif`;

                    wrapText(ctx, title, canvasWidth / 2, canvasHeight / 2, maxWidth, lineHeight);
                }
            }
        }, [canvasElement, title]);

        return (
            <TextToCanvasImageStyle ref={canvasElement} numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
                                    cardWidth={cardWidth} />
        )
    };

export default TextToCanvasImage

















// import {FC, useEffect, useRef} from 'react'
// import styled from "styled-components";
//
// interface TextToCanvasImagePropTypes {
//     title?: string,
//     numberOfCardsPerRowInMobile: number,
//     cardWidth: number,
// }
//
// interface TextToCanvasImageStylePropTypes {
//     numberOfCardsPerRowInMobile: number,
//     cardWidth: number,
// }
//
// const TextToCanvasImageStyle = styled.div`
//
//   width: 100%;
//   height: ${({numberOfCardsPerRowInMobile}: TextToCanvasImageStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw;
//   aspect-ratio: 16 / 9;
//   position: relative;
//   canvas {
//     width: 100%;
//     height: ${({numberOfCardsPerRowInMobile}: TextToCanvasImageStylePropTypes) => 96 / numberOfCardsPerRowInMobile / 1.777}vw !important;
//     aspect-ratio: 16 / 9;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: var(--main-text-color, #f90);
//   }
//
//   @media only screen and (min-width: 768px) {
//     width: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth}px;
//     height: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth / 1.777}px !important;
//     canvas {
//       width: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth}px;
//       height: ${({cardWidth}: TextToCanvasImageStylePropTypes) => cardWidth / 1.777}px !important;
//     }
//   }
// `
//
//
// const TextToCanvasImage: FC<TextToCanvasImagePropTypes> =
//     ({
//          numberOfCardsPerRowInMobile,
//          title,
//          cardWidth,
//      }) => {
//         const canvasElement = useRef<HTMLCanvasElement | null>(null)
//
//         useEffect(() => {
//             if (canvasElement?.current && title){
//                 const ctx = canvasElement?.current?.getContext('2d')
//                 //@ts-ignore
//                 ctx.font = '30px serif';
//                 //@ts-ignore
//                 ctx.fillStyle = '#fff';
//                 //@ts-ignore
//                 ctx.fillText(title.substring(0,15) + '...',50,(cardWidth / 1.777)/2);
//             }
//         }, [canvasElement?.current]);
//
//         return (
//             <TextToCanvasImageStyle numberOfCardsPerRowInMobile={numberOfCardsPerRowInMobile}
//                                     cardWidth={cardWidth}
//                                     className={'card-image'}>
//                 <canvas ref={canvasElement}/>
//
//             </TextToCanvasImageStyle>
//         )
//     };
// export default TextToCanvasImage
