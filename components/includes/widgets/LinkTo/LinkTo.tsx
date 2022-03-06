import {FC, useMemo} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

interface LinkToPropTypes {
    linkTo: string,
    linkToText: string,
    linkToWindowType: string,
    translations: {}
}

const LinkTo: FC<LinkToPropTypes> =
    ({
         linkTo,
         linkToText,
         linkToWindowType,
         translations,

     }) => {
        const {locale} = useRouter()

        const linkContent = useMemo(() => {
            return locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? linkToText :
                              translations?.[locale]?.linkToText || linkToText
        }, [])

        if (linkTo) {
            return (
                <Link href={linkTo ? linkTo : '/'}>
                    <a target={linkToWindowType || '_self'} className={'link-to'} title={linkContent}>
                        {linkContent}
                    </a>
                </Link>
            )
        } else return null

    };
export default LinkTo;
