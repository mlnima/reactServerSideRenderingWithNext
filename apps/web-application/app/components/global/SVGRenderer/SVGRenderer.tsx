import React, {FC} from "react";

interface SvgRendererPropTypes {
    customClassName?: string,
    color?: string,
    svgUrl: string,
    width?: number,
    height?: number,
    size?: number,
    customStyle?: string,
}

const SvgRenderer: FC<SvgRendererPropTypes> =
    ({
         customClassName,
         svgUrl,
         size,
         width,
         height,
         color,
         customStyle,
    }) => {

    const elementProps = {
        className: `${customClassName ? customClassName : ''} icon`,
        svgUrl,
        size,
        color,
        customStyle
    }

    return (
        <span {...elementProps}
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
