import React, {FC} from "react";
import styled from "styled-components";

interface SvgRendererPropTypes {
    customClassName?: string,
    customID?: string,
    color?: string,
    svgUrl: string,
    width?: number,
    height?: number,
    size?: number,
    customStyle?: string,

}

interface StylePropTypes {
    svgUrl: string,
    color?: string,
    width?: number,
    height?: number,
    customStyle?: string,
    style?: string,
    size?: number,
}

const Style = styled.span`
  mask: url(${({svgUrl}: StylePropTypes) => svgUrl}) no-repeat center !important;
  -webkit-mask: url(${({svgUrl}: StylePropTypes) => svgUrl}) no-repeat center !important;
  width: ${({width, size}: StylePropTypes) => width || size || 48}px;
  height: ${({height, size}: StylePropTypes) => height || size || 48}px;
  background-color: ${({color}: StylePropTypes) => color || ' var(--main-text-color, #ccc) '};
  ${({customStyle}:StylePropTypes)=>customStyle}
`

const SvgRenderer: FC<SvgRendererPropTypes> = ({customClassName, svgUrl, size, color,customStyle,customID}) => {
    const idProps = customID ? {id:customID}:{}
    const elementProps = {
        className: `${customClassName ? customClassName : ''} icon`,
        ...idProps,
        svgUrl,
        size,
        color,
        customStyle
    }
    return (
        <Style {...elementProps} />
    )
};

export default SvgRenderer
