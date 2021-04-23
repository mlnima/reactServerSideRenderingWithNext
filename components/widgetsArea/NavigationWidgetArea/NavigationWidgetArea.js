import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
let StyledNavigation = styled.nav`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  grid-area: navigation;
  min-height: 48px;
  @media only screen and (min-width: 768px) {
    height: 48px;
  }
${props => props.stylesData ?? ''}
`

const NavigationWidgetArea = ({postElementStyle,postElementSize,stylesData,className,position,isMobile,currentPageSidebar,referer,widgets,rendering}) => {
    return (
        <StyledNavigation stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
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
        </StyledNavigation>
    );
};
export default NavigationWidgetArea;
