import Link from "next/link";
import styled from "styled-components";

const WidgetFooterStyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--widget-h-f-background-color) ;
  a {
    padding: 10px;
    border-radius: 5px;
    color: var( --widget-h-f-text-color);
  }
`
const WidgetFooter = props => {
    if (props.redirectLink && props.redirectToTitle && props.footerLink){
        return (
            <WidgetFooterStyledDiv className='widget-footer'>
                <Link href={props.redirectLink} >
                    <a>{props.redirectToTitle}</a>
                </Link>
            </WidgetFooterStyledDiv>
        );
    }else return null

};

export default WidgetFooter;
