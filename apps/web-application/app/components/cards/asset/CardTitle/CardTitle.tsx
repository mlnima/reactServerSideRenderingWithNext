import Link from "next/link";
import {FC} from "react";
import {capitalizeFirstLetter} from "custom-util";
import './CardTitle.styles.scss';

interface CardTitlePropTypes {
    title: string | undefined,
    url: string | undefined,
    targetLink?: string,
}

const CardTitle: FC<CardTitlePropTypes> = ({title, url, targetLink}) => {

    return (
        <div className={'cardTitle'}>
            <Link href={url || '#'} title={title} target={targetLink || '_self'}>
                { capitalizeFirstLetter(title)   }
            </Link>
        </div>
    );
};
export default CardTitle;
