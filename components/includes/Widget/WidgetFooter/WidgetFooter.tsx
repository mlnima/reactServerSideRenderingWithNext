import Link from "next/link";
import styled from "styled-components";
import {FC} from "react";

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

interface WidgetFooterPropTypes {
    translations: {},
    title: string,
    redirectLink: string,
    redirectToTitle: string,
    footerLink: string,
}

const WidgetFooter:FC<WidgetFooterPropTypes> = ({redirectLink,redirectToTitle,footerLink}) => {
    if (redirectLink && redirectToTitle && footerLink){
        return (
            <WidgetFooterStyledDiv className='widget-footer'>
                <Link href={redirectLink} >
                    <a>{redirectToTitle}</a>
                </Link>
            </WidgetFooterStyledDiv>
        );
    }else return null

};

export default WidgetFooter;
