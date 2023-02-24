import Link from 'next/link'
import {useRouter} from "next/router";
import styled from "styled-components";
import {FC} from "react";

const WidgetHeaderStyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  max-height: 30px;
  margin: 8px 0;
  .widget-header-title{
    font-weight: initial;
    font-size: 20px;
  }
  
  .widget-header-redirect-link{
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
    //@ts-ignore
    const widgetHeaderTitle = translations ? translations?.[locale] ? translations?.[locale]?.title || title : title : title

        return (
            <WidgetHeaderStyledDiv className='widget-Header' >
                <h2 className='widget-header-title sub-content'>{widgetHeaderTitle}</h2>
                {redirectLink && redirectToTitle && !footerLink ?
                    <Link href={redirectLink}
                          className={'btn btn-secondary widget-header-redirect-link'}
                          title={widgetHeaderTitle + ' content'}
                          aria-label={redirectToTitle}>
                            {redirectToTitle}
                    </Link>
                    :null
                }
            </WidgetHeaderStyledDiv>
        );
};

export default WidgetHeader;
