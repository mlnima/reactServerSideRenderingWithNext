import {memo} from "react";
import styled from "styled-components";
import WidgetsRenderer from "../../includes/WidgetsRenderer/WidgetsRenderer";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useRouter} from "next/router";
const StyledFooter = styled.footer`
  background-color: var(--main-background-color,#000);
  grid-area: footer;
  padding: 0 10px 15px;
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
  
  ${(props:{stylesData:string}) => props.stylesData ?? ''}
`

const FooterWidgetArea = ( ) => {
    const footerStyle = useSelector(({settings}: Store) => settings?.design?.footerStyle)
    const {asPath} = useRouter()

    if (!/\/messenger|\/chatroom/g.test(asPath)){
        return (
            <StyledFooter stylesData={footerStyle || ''} className={'widget-area footer' }>
                <div className='footer-content'>
                    <WidgetsRenderer position={'footer'}/>
                </div>

            </StyledFooter>
        );
    }else return null

};
export default memo(FooterWidgetArea);
