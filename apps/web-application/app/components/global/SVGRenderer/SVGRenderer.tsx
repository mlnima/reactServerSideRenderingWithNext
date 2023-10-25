'use client';
import React, {FC} from "react";

interface SvgRendererPropTypes {
    customClassName?: string,
    color?: string,
    svgUrl: string,
    width?: number,
    height?: number,
    size?: number,
}

const SvgRenderer: FC<SvgRendererPropTypes> =
    ({
         customClassName,
         svgUrl,
         size,
         width,
         height,
         color
    }) => {

    return (
        <span className={`${customClassName ? customClassName : ''} icon`}
        style={{
            mask: `url(${svgUrl}) no-repeat center`,
            WebkitMask: `url(${svgUrl}) no-repeat center`,
            width: `${width || size || 48}px`,
            height: `${height || size || 48}px`,
            backgroundColor: `${color || 'var(--primary-text-color)'}`,
        }}/>
    )
};

export default SvgRenderer

//{...elementProps}