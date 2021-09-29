import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";

const StyledFooter = styled.footer`
  background-color: var(--footer-background-color,#18181b);
  grid-area: footer;
  .footer-content{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  
  }
  ${props => props.stylesData ?? ''}
`;

const FooterWidgetArea = ({stylesData, className, position, isMobile, currentPageSidebar, referer, rendering}) => {
    return (
        <StyledFooter stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='footer-content'>
                <WidgetsRenderer
                    currentPageSidebar={currentPageSidebar}
                    isMobile={isMobile}
                    rendering={rendering}
                    position={position}
                    referer={referer}
                />
            </div>

        </StyledFooter>
    );
};
export default FooterWidgetArea;
