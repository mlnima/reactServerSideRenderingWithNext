import Link from 'next/link'
import {FC} from "react";
import './WidgetHeader.scss'

interface WidgetHeaderPropTypes {
    title: string,
    redirectLink: string,
    redirectToTitle: string,
    redirectLinkPosition: string,
    dictionary: {
        [key: string]: string
    }
}

const WidgetHeader: FC<WidgetHeaderPropTypes> = (
    {
        title,
        redirectLink,
        redirectToTitle,
        redirectLinkPosition,
        dictionary
    }) => {

    return (
        <div className='widget-Header'>
            <h2 className='widget-header-title'> {dictionary?.[title] || title}</h2>
            {(redirectLink && (redirectLinkPosition === 'header' || !redirectLinkPosition)) &&
                <Link href={redirectLink}
                      className={'btn btn-primary widget-header-redirect-link'}
                      title={title + ' content'}
                      aria-label={redirectToTitle}>
                    {dictionary?.[redirectToTitle] || redirectToTitle}
                </Link>
            }
        </div>
    );
};

export default WidgetHeader;
