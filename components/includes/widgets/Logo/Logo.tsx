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

    const locale = useRouter()?.locale

    const logoData = useMemo(() => {
        const logoUrlSource =  LogoUrl && !isAbsolutePath(LogoUrl) ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${LogoUrl}` : LogoUrl
        return {
            logoUrlSource,
            logoText: translations ? translations[locale] ? translations[locale].LogoText || LogoText : LogoText : LogoText,
            headLineData: translations ? translations[locale] ? translations[locale].headLine || headLine : headLine : headLine,
            isInternalUrl: isInternalUrl(LogoUrl),
            isImageAllowedForNextImage: isImageAllowedForNextImage(logoUrlSource)
        }
    }, [])

    return (
        <Link href='/'>
            <a className='logo'>
                {logoData?.logoUrlSource && logoData.isImageAllowedForNextImage ?
                    <LogoUsingNextImage logoUrl={logoData?.logoUrlSource} alt={'logo'}/> :
                    logoData?.logoUrlSource ?
                        <img alt={'logo'}
                             onMouseEnter={hoverHandler}
                             onMouseOver={hoverHandler}
                             onTouchStartCapture={hoverHandler}
                             onTouchEnd={hoverHandler}
                             src={logoData?.logoUrlSource}
                        />
                        : null}
                {logoData.logoText ? <span className='logo-text'> {logoData.logoText} </span> : null}
                {logoData.headLineData ? <p className='logo-headline'>{logoData.headLineData}</p> : null}
            </a>
        </Link>
    );
};

export default Logo;
