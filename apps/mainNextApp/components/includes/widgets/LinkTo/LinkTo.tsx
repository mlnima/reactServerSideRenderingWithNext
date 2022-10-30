import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {UniqueDataTypes} from "@_typeScriptTypes/widgets/Widget";


interface LinkToPropTypes {
    linkTo: string,
    linkToText: string,
    linkToWindowType: string,
    translations: {},
    uniqueData:UniqueDataTypes
}

const LinkTo: FC<LinkToPropTypes> =
    ({
         linkTo,
         linkToText,
         linkToWindowType,
         translations,
         uniqueData
     }) => {
        const {locale} = useRouter()

        const linkContent = useMemo(() => {
            return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? uniqueData?.linkToText || linkToText :
                             uniqueData?.translations?.[locale]?.linkToText || translations?.[locale]?.linkToText || linkToText
        }, [linkTo,linkToText,linkToWindowType,translations])

        if (uniqueData?.linkTo||linkTo) {
            return (
                <Link href={uniqueData?.linkTo || linkTo || '/'}
                      target={uniqueData?.linkToWindowType || linkToWindowType || '_self'}
                      className={'link-to'}
                      title={linkContent}>

                        {linkContent}

                </Link>
            )
        } else return null

    };
export default LinkTo;
