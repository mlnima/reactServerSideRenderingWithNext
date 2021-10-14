import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {WidgetPropTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

const StyledFooter = styled.footer`
  background-color: var(--footer-background-color,#000);
  grid-area: footer;
  .footer-content{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  
  }
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`;

interface FooterWidgetAreaProps {
    postElementStyle: string;
    postElementSize: string;
    stylesData: string;
    className: string;
    position: string;
    postElementImageLoaderType: string;
    postElementImageLoader: string;
    referer: boolean;
    rendering: boolean;
    widgets: WidgetPropTypes[]
}

const FooterWidgetArea = ({stylesData, className, position, referer, rendering}:FooterWidgetAreaProps) => {
    return (
        <StyledFooter stylesData={stylesData ?? ''} className={className + ' widget-area ' + position}>
            <div className='footer-content'>
                <WidgetsRenderer
                    rendering={rendering}
                    position={position}
                    referer={referer}
                />
            </div>

        </StyledFooter>
    );
};
export default FooterWidgetArea;
