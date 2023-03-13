import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {useRouter} from "next/router";

const StyledFooter = styled.footer`
  background-color: var(--main-background-color,#000);
  grid-area: footer;
  padding: 0 8px;
  box-sizing: border-box;
  .footer-content{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
  }
  @media only screen and (min-width: 768px) {
    .footer-content{
      flex-direction: column;
    }
  }
`

const FooterWidgetArea = ( ) => {

    const {asPath} = useRouter()

    if (!/\/messenger|\/chatroom/g.test(asPath)){
        return (
            <StyledFooter className={'widget-area footer' }>
                <div className='footer-content'>
                    <WidgetsRenderer position={'footer'}/>
                </div>
            </StyledFooter>
        );
    }else return null

};
export default memo(FooterWidgetArea);
