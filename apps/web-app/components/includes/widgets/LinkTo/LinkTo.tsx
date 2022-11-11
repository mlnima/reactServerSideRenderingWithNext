import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {UniqueDataTypes} from "typescript-types";
import useTranslation from "next-translate/useTranslation";
import {i18LibTranslationWithCallback, widgetTranslationContentSelector} from "@_variables/translationVariables";

interface LinkToPropTypes {
    translations: {},
    uniqueData:UniqueDataTypes
}

const LinkTo: FC<LinkToPropTypes> = ({translations, uniqueData}) => {
        const {locale} = useRouter()
        const {t} = useTranslation();

        if (uniqueData?.linkTo) {

            const linkContent = useMemo(() => {
                return i18LibTranslationWithCallback(
                    t,
                    null,
                    widgetTranslationContentSelector(locale,uniqueData,'linkToText')
                )
            }, [uniqueData,translations])

            return (
                <Link href={uniqueData?.linkTo}
                      target={uniqueData?.linkToWindowType || '_self'}
                      className={'link-to'}
                      style={{color:'var(--main-text-color)'}}
                      title={linkContent}>
                        {linkContent}
                </Link>
            )
        } else return null

    };
export default LinkTo;
