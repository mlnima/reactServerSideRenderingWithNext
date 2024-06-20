import { FC } from 'react';
import Link from 'next/link';
import { UniqueDataTypes } from 'typescript-types';

interface LinkToPropTypes {
    translations: {
        [key: string]: any;
    };
    dictionary: {
        [key: string]: string;
    };
    locale: string;
    uniqueData: UniqueDataTypes;
}

const LinkTo: FC<LinkToPropTypes> = ({ translations, uniqueData, locale, dictionary }) => {
    const textAndTitle =
        dictionary?.[uniqueData.linkToText] ||
        translations?.[locale]?.linkToText ||
        uniqueData.linkToText;
    return (
        <Link
            href={uniqueData?.linkTo as string}
            target={uniqueData?.linkToWindowType || '_self'}
            className={'link-to'}
            style={{ color: 'var(--primary-text-color,#fff)' }}
            title={textAndTitle}
        >
            {textAndTitle}
        </Link>
    );
};
export default LinkTo;
