import React from 'react';
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
const StyledSection = styled.section`${(props:{stylesData:string}) => props.stylesData ?? ''}`

interface SectionWidgetAreaProps {
    stylesData: string;
    className: string;
    position: string;
}

const SectionWidgetArea = ({stylesData,className,position}:SectionWidgetAreaProps) => {
    return (
        <StyledSection stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer position={position}/>
        </StyledSection>
    );
};
export default SectionWidgetArea;
