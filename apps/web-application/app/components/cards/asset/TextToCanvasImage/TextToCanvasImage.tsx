// @ts-nocheck
"use client";
import { FC, useEffect, useRef } from 'react';

interface TextToCanvasImagePropTypes {
    title?: string,
    aspectRatio?: string,
    numberOfCardsPerRowInMobile: number,
}

const TextToCanvasImage: FC<TextToCanvasImagePropTypes> = ({ numberOfCardsPerRowInMobile, title,aspectRatio }) => {
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
            <canvas ref={canvasElement} className={`w-1/${numberOfCardsPerRowInMobile} md:w-64 aspect-${ aspectRatio ||  'video'}`}  />
        )
    };

export default TextToCanvasImage
