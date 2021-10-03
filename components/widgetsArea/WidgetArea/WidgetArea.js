import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledDiv = styled.div`${props => props.stylesData ?? ''}`

const WidgetArea = ({stylesData,className,position,isMobile,referer,rendering}) => {
    return (
        <StyledDiv stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                isMobile={isMobile}
                rendering={rendering}
                position={position}
                referer={referer}
            />
        </StyledDiv>
    );
};
export default WidgetArea;
