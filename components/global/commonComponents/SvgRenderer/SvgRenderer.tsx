import React, {FC} from "react";
import styled from "styled-components";

interface SvgRendererPropTypes {
    customClassName?: string,
    color?: string,
    svgUrl: string,
    width?: number,
    height?: number,
    size?: number,
}

interface StylePropTypes {
    svgUrl: string,
    color?: string,
    width?: number,
    height?: number,
    size?: number,
}

const Style = styled.span`
  mask: url(${({svgUrl}: StylePropTypes) => svgUrl}) no-repeat center !important;
  -webkit-mask: url(${({svgUrl}: StylePropTypes) => svgUrl}) no-repeat center !important;
  width: ${({width, size}: StylePropTypes) => width || size || 48}px;
  height: ${({height, size}: StylePropTypes) => height || size || 48}px;
  background-color: ${({color}: StylePropTypes) => color || ' var(--main-text-color, #ccc) '};
`

const SvgRenderer: FC<SvgRendererPropTypes> = ({customClassName, svgUrl, size, color}) => {
    return (
        <Style className={`${customClassName + ' ' || ''}icon`} svgUrl={svgUrl} size={size} color={color}/>
    )
};

export default SvgRenderer
