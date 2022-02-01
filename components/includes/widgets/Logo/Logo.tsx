import {FC,useMemo} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import isImageAllowedForNextImage from "../../../../_variables/util/isImageAllowedForNextImage";
import isAbsolutePath from "../../../../_variables/util/isAbsolutePath";
import dynamic from "next/dynamic";
import styled from "styled-components";
const LogoUsingNextImage = dynamic(() => import('./LogoUsingNextImage'));

const LogoStyledDiv = styled.div`
  a{
    .logo-text,.logo-headline{
      color: var(--main-text-color);
    }
    .logo-text{
      font-weight: bold;
    }
  }
`

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
            isImageAllowedForNextImage: isImageAllowedForNextImage(logoUrlSource)
        }
    }, [])

    return (
        <LogoStyledDiv>
            <Link href='/'>
                <a className='logo' href='/'>
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
        </LogoStyledDiv>

    );
};

export default Logo;
