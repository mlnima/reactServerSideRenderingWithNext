import {useContext} from 'react';
import Link from 'next/link'
import {AppContext} from '../../../../context/AppContext';
import {useRouter} from "next/router";
import styled from "styled-components";
const WidgetHeaderStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px ;
  border-radius: 5px;
  max-height: 30px;
  background-color: var(--widget-header-footer-background-color,transparent) ;
  .widget-header-title{
    font-weight: initial;
    font-size: 14px;
    padding: 0 2px;
    color: var( --widget-header-footer-text-color,#fff);
  }
  a{
    padding: 3px 5px;
    border-radius: 5px;
    color: var( --widget-header-footer-text-color,#fff);
  }
`
const WidgetHeader = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const title = props.translations ? props.translations[router.locale || contextData.state.activeLanguage] ? props.translations[router.locale ||contextData.state.activeLanguage].title || props.title : props.title : props.title
    if (props.title) {
        return (
            <WidgetHeaderStyledDiv className='widget-Header' >
                <h2 className='widget-header-title'>{title}</h2>
                {props.redirectLink && props.redirectToTitle && !props.footerLink ? <Link href={props.redirectLink}><a aria-label={props.redirectToTitle}>{props.redirectToTitle}</a></Link>:null }
            </WidgetHeaderStyledDiv>
        );
    } else return null

};

export default WidgetHeader;
