import Link from "next/link";
import {FC} from "react";
import {capitalizeFirstLetter} from "custom-util";
import './CardTitle.styles.scss'

interface CardTitlePropTypes {
    title: string | undefined,
    url: string | undefined,
    targetLink?: string,
}

const CardTitle: FC<CardTitlePropTypes> = ({title, url, targetLink}) => {

    return (
        <h1 className={'card-title'}>
            <Link href={url || '#'} title={title} target={targetLink || '_self'}  prefetch={false}>
                { capitalizeFirstLetter(title)   }
            </Link>
        </h1>
    );
};
export default CardTitle;
