import {FC} from "react";
import Link from "next/link";
import {UniqueDataTypes} from "typescript-types";

interface LinkToPropTypes {
    translations: {},
    locale: string,
    uniqueData: UniqueDataTypes
}

const LinkTo: FC<LinkToPropTypes> = ({translations, uniqueData, locale}) => {

    return (
        <Link href={uniqueData?.linkTo as string}
              target={uniqueData?.linkToWindowType || '_self'}
              className={'link-to'}
              style={{color: 'var(--primary-text-color,#fff)'}}
              //@ts-ignore
              title={translations?.[locale]?.linkToText ?? uniqueData.linkToText}>
            {/*//@ts-ignore*/}
            {translations?.[locale]?.linkToText ?? uniqueData.linkToText}
        </Link>
    )
};
export default LinkTo;
