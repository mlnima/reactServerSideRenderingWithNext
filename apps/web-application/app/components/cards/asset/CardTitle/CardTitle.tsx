import Link from "next/link";
import {FC} from "react";
import {capitalizeFirstLetter} from "shared-util";
import './CardTitle.styles.scss';

interface CardTitlePropTypes {
    title: string | undefined,
    url?: string | undefined,
    targetLink?: string,
    useLink?: boolean
}

const CardTitle: FC<CardTitlePropTypes> = ({title, url, targetLink, useLink = true}) => {

    return (
        <div className={'cardTitle'}>
            {useLink ?
                <Link href={url || '#'} title={title} target={targetLink || '_self'}>
                    {capitalizeFirstLetter(title)}
                </Link> :
                <p>
                    {capitalizeFirstLetter(title)}
                </p>
            }
        </div>
    );
};
export default CardTitle;
