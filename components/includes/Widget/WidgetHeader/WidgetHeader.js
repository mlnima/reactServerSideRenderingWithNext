import Link from 'next/link'
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
    font-weight: bold;
  }
`

const WidgetHeader = props => {
    const router = useRouter()
    const title = props.translations ? props.translations[router.locale] ? props.translations[router.locale].title || props.title : props.title : props.title
        return (
            <WidgetHeaderStyledDiv className='widget-Header' >
                <h2 className='widget-header-title'>{title}</h2>
                {props.redirectLink && props.redirectToTitle && !props?.footerLink ?
                    <Link href={props.redirectLink}>
                        <a className={'btn btn-secondary'} rel={'next'} title={title + ' content'} aria-label={props.redirectToTitle}>
                            {props.redirectToTitle}
                        </a>
                    </Link>
                    :null
                }
            </WidgetHeaderStyledDiv>
        );
};

export default WidgetHeader;
