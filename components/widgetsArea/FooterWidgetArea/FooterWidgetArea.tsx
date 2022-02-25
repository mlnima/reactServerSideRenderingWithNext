import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {useSelector} from "react-redux";

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
`

const FooterWidgetArea = ( ) => {
    const footerStyle = useSelector(({settings}: StoreTypes) => settings?.design?.footerStyle)

    return (
        <StyledFooter stylesData={footerStyle || ''} className={'widget-area footer' }>
            <div className='footer-content'>
                <WidgetsRenderer position={'footer'}/>
            </div>

        </StyledFooter>
    );
};
export default FooterWidgetArea;
