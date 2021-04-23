import Link from "next/link";
import styled from "styled-components";
let StyledDiv = styled.div`
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
            <StyledDiv className='WidgetFooter'>
                <Link href={props.redirectLink} ><a>{props.redirectToTitle}</a></Link>
            </StyledDiv>
        );
    }else return null

};

export default WidgetFooter;
