import Link from 'next/link'
import {FC} from "react";
import WidgetHeaderStyles from "@components/widgets/widgetWrapper/WidgetHeader/WidgetHeader.styles";

interface WidgetHeaderPropTypes {
    locale: string,
    translations: {},
    title: string,
    redirectLink: string,
    redirectToTitle: string,
    footerLink: string,
}

const WidgetHeader: FC<WidgetHeaderPropTypes> = (
    {
        translations,
        title,
        redirectLink,
        redirectToTitle,
        footerLink,
        locale
    }) => {

    return (
        <WidgetHeaderStyles className='widget-Header'>
            <h2 className='widget-header-title sub-content'>{translations?.[locale]?.title ?? title}</h2>
            {(redirectLink && redirectToTitle && !footerLink) &&
                <Link href={redirectLink}
                      className={'btn btn-secondary widget-header-redirect-link'}
                      title={(translations?.[locale]?.title ?? title) + ' content'}
                      aria-label={redirectToTitle}>
                    {redirectToTitle}
                </Link>
            }
        </WidgetHeaderStyles>
    );
};

export default WidgetHeader;
