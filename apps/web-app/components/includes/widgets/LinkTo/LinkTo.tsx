import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {UniqueDataTypes} from "typescript-types";
import useTranslation from "next-translate/useTranslation";


interface LinkToPropTypes {
    translations: {},
    uniqueData:UniqueDataTypes
}

const LinkTo: FC<LinkToPropTypes> = ({translations, uniqueData}) => {
        const {locale} = useRouter()
        const {t} = useTranslation();

        const linkContent = useMemo(() => {
            const widgetTranslation =  locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? uniqueData?.linkToText || uniqueData.linkToText :
                             uniqueData?.translations?.[locale]?.uniqueData?.linkToText || translations?.[locale]?.uniqueData?.linkToText || uniqueData.linkToText;

            return    t(`common:${widgetTranslation}`, {},
                {fallback:t(`customTranslation:${widgetTranslation}`,{},
                        {fallback:widgetTranslation})})

        }, [uniqueData,translations])

        if (uniqueData?.linkTo) {
            return (
                <Link href={uniqueData?.linkTo}
                      target={uniqueData?.linkToWindowType || '_self'}
                      className={'link-to'}
                      title={linkContent}>
                        {linkContent}
                </Link>
            )
        } else return null

    };
export default LinkTo;
