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
    referer: boolean;
    rendering: boolean;
    gridArea:string;
    widgets: WidgetPropTypes[]
}

const SectionWidgetArea = ({stylesData,className,position}:SectionWidgetAreaProps) => {
    return (
        <StyledSection stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                position={position}
            />
        </StyledSection>
    );
};
export default SectionWidgetArea;
