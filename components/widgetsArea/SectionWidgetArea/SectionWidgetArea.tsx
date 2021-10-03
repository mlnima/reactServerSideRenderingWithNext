import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";
let StyledSection = styled.section`${(props:{stylesData:string}) => props.stylesData ?? ''}`

interface SectionWidgetAreaProps {
    postElementStyle: string;
    postElementSize: string;
    stylesData: string;
    className: string;
    position: string;
    postElementImageLoaderType: string;
    postElementImageLoader: string;
    isMobile: boolean;
    referer: boolean;
    rendering: boolean;
    gridArea:string;
    widgets: WidgetPropTypes[]
}

const SectionWidgetArea = ({stylesData,className,position,isMobile,referer,rendering}:SectionWidgetAreaProps) => {
    return (
        <StyledSection stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                isMobile={isMobile}
                rendering={rendering}
                position={position}
                referer={referer}
            />
        </StyledSection>
    );
};
export default SectionWidgetArea;
