import Link from 'next/link'
import {FC} from "react";
import './WidgetHeader.styles.scss'

interface WidgetHeaderPropTypes {
    title: string,
    redirectLink: string,
    redirectToTitle: string,
}

const WidgetHeader: FC<WidgetHeaderPropTypes> = (
    {
        title,
        redirectLink,
        redirectToTitle,
    }) => {

    return (
        <div className='widget-Header'>
            <h2 className='widget-header-title'>{title}</h2>
            {(redirectLink && redirectToTitle) &&
                <Link href={redirectLink}
                      className={'btn btn-secondary widget-header-redirect-link'}
                      title={title + ' content'}
                      aria-label={redirectToTitle}>
                    {redirectToTitle}
                </Link>
            }
        </div>
    );
};

export default WidgetHeader;
