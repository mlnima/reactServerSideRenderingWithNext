import Link from "next/link";
import {FC} from "react";
import {capitalizeFirstLetter} from "custom-util";

interface CardTitlePropTypes {
    title: string | undefined,
    url: string | undefined,
    targetLink?: string
}

const CardTitle: FC<CardTitlePropTypes> = ({title, url, targetLink}) => {

    return (
        <h1 className={'title m-1 py-1 md:p-0 md:leading-none box-border'}>
            <Link className={`text-secondary-text-color block truncate cursor-pointer box-border text-base font-normal`}
                  href={url || '#'} title={title} target={targetLink || '_self'} prefetch={false}>
                { capitalizeFirstLetter(title)   }
            </Link>
        </h1>
    );
};
export default CardTitle;
