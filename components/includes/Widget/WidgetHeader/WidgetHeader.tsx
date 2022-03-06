import Link from 'next/link'
import {useRouter} from "next/router";
import styled from "styled-components";
import {FC} from "react";

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

interface WidgetHeaderPropTypes {
    translations: {},
    title: string,
    redirectLink: string,
    redirectToTitle: string,
    footerLink: string,
}

const WidgetHeader:FC<WidgetHeaderPropTypes> = ({translations,title,redirectLink,redirectToTitle,footerLink}) => {

    const {locale} = useRouter()
    const widgetHeaderTitle = translations ? translations[locale] ? translations[locale]?.title || title : title : title

        return (
            <WidgetHeaderStyledDiv className='widget-Header' >
                <h2 className='widget-header-title'>{widgetHeaderTitle}</h2>
                {redirectLink && redirectToTitle && !footerLink ?
                    <Link href={redirectLink}>
                        <a className={'btn btn-secondary'} rel={'next'} title={widgetHeaderTitle + ' content'} aria-label={redirectToTitle}>
                            {redirectToTitle}
                        </a>
                    </Link>
                    :null
                }
            </WidgetHeaderStyledDiv>
        );
};

export default WidgetHeader;
