import {useContext} from 'react';
import Link from 'next/link'
import {AppContext} from '../../../../context/AppContext';
import {useRouter} from "next/router";
import styled from "styled-components";
let StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px ;
  border-radius: 5px;
  border-left: 5px solid ;
  max-height: 30px;
  background-color: var(--widget-h-f-background-color) ;
  .widget-header-title{
    font-weight: initial;
    font-size: 18px;
    padding: 0 10px;
    color: var( --widget-h-f-text-color);
  }
  a{
    padding: 3px 5px;
    border-radius: 5px;
    color: var( --widget-h-f-text-color);
  }
`
const WidgetHeader = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const title = props.translations ? props.translations[router.locale || contextData.state.activeLanguage] ? props.translations[router.locale ||contextData.state.activeLanguage].title || props.title : props.title : props.title
    if (props.title) {
        return (
            <StyledDiv className='widget-Header' >
                <h1 className='widget-header-title'>{title}</h1>
                {props.redirectLink && props.redirectToTitle && !props.footerLink ? <Link href={props.redirectLink}><a aria-label={props.redirectToTitle}>{props.redirectToTitle}</a></Link>:null }
            </StyledDiv>
        );
    } else return null

};

export default WidgetHeader;
