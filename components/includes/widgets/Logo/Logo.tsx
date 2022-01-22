import {FC,useMemo} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import isInternalUrl from "../../../../_variables/util/isInternalUrl";
import isImageAllowedForNextImage from "../../../../_variables/util/isImageAllowedForNextImage";
import isAbsolutePath from "../../../../_variables/util/isAbsolutePath";
import dynamic from "next/dynamic";

const LogoUsingNextImage = dynamic(() => import('./LogoUsingNextImage'));

interface LogoPropTypes {
    translations: {},
    LogoText: string,
    headLine: string,
    LogoUrl: string,
    hoverHandler: any,
}

const Logo: FC<LogoPropTypes> = ({translations, LogoText, headLine, LogoUrl, hoverHandler}) => {
    const router = useRouter()

    const logoUrlSource = useMemo(() => {
        return LogoUrl && !isAbsolutePath(LogoUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${LogoUrl}` : LogoUrl
    }, [])

    const logoData = useMemo(() => {
        return {
            logoText: translations ? translations[router.locale] ? translations[router.locale].LogoText || LogoText : LogoText : LogoText,
            headLineData: translations ? translations[router.locale] ? translations[router.locale].headLine || headLine : headLine : headLine,
            isInternalUrl: isInternalUrl(LogoUrl),
            isImageAllowedForNextImage: isImageAllowedForNextImage(logoUrlSource)
        }
    }, [])

    return (
        <Link href='/'>
            <a className='logo'>
                {logoUrlSource && logoData.isImageAllowedForNextImage ?
                    <LogoUsingNextImage logoUrl={logoUrlSource} alt={'logo'}/> :
                    logoUrlSource ?
                        <img alt={'logo'}
                             onMouseEnter={hoverHandler}
                             onMouseOver={hoverHandler}
                             onTouchStartCapture={hoverHandler}
                             onTouchEnd={hoverHandler}
                             src={logoUrlSource}
                        />
                        : null}
                {logoData.logoText ? <span className='logo-text'> {logoData.logoText} </span> : null}
                {logoData.headLineData ? <p className='logo-headline'>{logoData.headLineData}</p> : null}
            </a>
        </Link>
    );
};

export default Logo;
