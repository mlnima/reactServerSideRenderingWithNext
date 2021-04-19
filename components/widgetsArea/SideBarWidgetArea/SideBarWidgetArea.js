import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledSideBar = styled.aside`${props => props.stylesData ?? ''}`

const SideBarWidgetArea = ({postElementStyle,postElementSize,stylesData,className,position,isMobile,currentPageSidebar,referer,widgets,rendering}) => {
    return (
        <StyledSideBar stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <WidgetsRenderer
                currentPageSidebar={currentPageSidebar}
                isMobile={isMobile}
                widgets={widgets}
                rendering={rendering}
                position={position}
                referer={referer}
                postElementSize={postElementSize}
                postElementStyle={postElementStyle}
            />
        </StyledSideBar>
    );
};
export default SideBarWidgetArea;
