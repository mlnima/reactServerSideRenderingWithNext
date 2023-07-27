import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {UniqueDataTypes} from "typescript-types";
import useTranslation from "next-translate/useTranslation";
import {nextTranslateWithCallback} from "custom-util";

interface LinkToPropTypes {
    translations: {},
    uniqueData: UniqueDataTypes
}

const LinkTo: FC<LinkToPropTypes> = ({translations, uniqueData}) => {
    const {locale} = useRouter()
    const {t} = useTranslation();

    if (uniqueData?.linkTo) {

        const linkContent = useMemo(() => {
            return nextTranslateWithCallback({
                    t,
                    primaryNamespace: null,
                    originalString: translations?.[locale as string]?.linkToText || uniqueData?.linkToText || ''
                }
            )
        }, [uniqueData, translations])

        return (
            <Link href={uniqueData?.linkTo}
                  target={uniqueData?.linkToWindowType || '_self'}
                  className={'link-to'}
                  style={{color: 'var(--primary-text-color,#fff)'}}
                  title={linkContent}>
                {linkContent}
            </Link>
        )
    } else return null

};
export default LinkTo;
