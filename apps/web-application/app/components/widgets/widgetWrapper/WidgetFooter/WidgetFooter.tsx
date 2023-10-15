import Link from "next/link";
import {FC} from "react";
import './WidgetFooter.scss'

interface WidgetFooterPropTypes {
    redirectLink: string,
    redirectToTitle: string,
    dictionary: {
        [key: string]: string
    }
}

const WidgetFooter:FC<WidgetFooterPropTypes> = ({redirectLink,redirectToTitle,dictionary}) => {
        return (
            <div className='widgetFooter'>
                <Link href={redirectLink} className={'btn btn-primary'} >
                    {dictionary?.[redirectToTitle] || redirectToTitle}
                </Link>
            </div>
        );
};

export default WidgetFooter;
