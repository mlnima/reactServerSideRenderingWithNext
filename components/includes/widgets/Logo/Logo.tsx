import {FC,useMemo} from 'react';
import dynamic from "next/dynamic";
import Link from "next/link";
import {useRouter} from "next/router";
import isImageAllowedForNextImage from "../../../../_variables/util/isImageAllowedForNextImage";
import isAbsolutePath from "../../../../_variables/util/isAbsolutePath";
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
    .logo-headline{
      margin: 5px 0 0 0;
    }
  }
`

interface LogoPropTypes {
    translations: {},
    LogoText: string,
    headLine: string,
    LogoUrl: string,
}

const Logo: FC<LogoPropTypes> = ({translations, LogoText, headLine, LogoUrl}) => {

    const {locale} = useRouter()

    const logoData = useMemo(() => {
        const logoUrlSource =  LogoUrl && !isAbsolutePath(LogoUrl) ?
                              `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${LogoUrl}` :
                                LogoUrl
        return {
            logoUrlSource,
            logoText: locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? LogoText : translations?.[locale]?.LogoText,
            headLineData: locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? headLine : translations?.[locale]?.headLine,
            isImageAllowedForNextImage: isImageAllowedForNextImage(logoUrlSource)
        }
    }, [])

    return (
        <LogoStyledDiv>
            <Link href='/'>
                <a className='logo' href='/'>
                    {logoData?.logoUrlSource && logoData?.isImageAllowedForNextImage ?
                        <LogoUsingNextImage logoUrl={logoData?.logoUrlSource} alt={'logo'}/> :
                        logoData?.logoUrlSource ?
                            <img alt={'logo'} src={logoData?.logoUrlSource}/>
                            : null}
                    {logoData.logoText && !logoData?.logoUrlSource ?
                        <span className='logo-text'> {logoData.logoText} </span>
                        : null
                    }
                    {logoData.headLineData ? <p className='logo-headline'>{logoData.headLineData}</p> : null}
                </a>
            </Link>
        </LogoStyledDiv>

    );
};

export default Logo;
