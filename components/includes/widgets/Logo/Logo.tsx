import {FC, useMemo} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";
import {UniqueDataTypes} from "@_variables/TypeScriptTypes/Widgets";

const LogoStyledDiv = styled.div`

  a {
    .logo-text, .logo-headline {
      color: var(--main-text-color);
    }

    .logo-text {
      font-weight: bold;
    }

    .logo-headline {
      margin: 5px 0 0 0;
    }
  }
`

interface LogoPropTypes {
    uniqueData: UniqueDataTypes,
    translations: {},
    LogoUrl: string,
}

const Logo: FC<LogoPropTypes> = ({uniqueData, LogoUrl}) => {

    const {locale} = useRouter()

    const {logoUrlSource, logoText, headLineData} = useMemo(() => {
        // Logo Url must get Deleted after live sites widget data reSet
        return {
            logoUrlSource: uniqueData?.logoUrl || LogoUrl,
            logoText: locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? uniqueData.logoText : uniqueData?.translations?.[locale]?.logoText,
            headLineData: locale === process.env.NEXT_PUBLIC_DEFAULT_LOCAL ? uniqueData?.headLine : uniqueData?.translations?.[locale]?.headLine,
        }
    }, [uniqueData,LogoUrl])


    return (
        <LogoStyledDiv className={'logo-wrapper'}>
            <Link href='/'>
                <a className='logo' href='/'>

                    {logoUrlSource && <img alt={'logo'} src={logoUrlSource}/> }
                    {logoText && !logoUrlSource ?
                        <span className='logo-text'> {logoText} </span>
                        : null
                    }
                    {headLineData && <p className='logo-headline'>{headLineData}</p> }
                </a>
            </Link>
        </LogoStyledDiv>

    );
};

export default Logo;



// {logoUrlSource ? <img alt={'logo'} src={logoUrlSource}/> : null}
// <Link href='/'>
//     <a className='logo' href='/'>
//         {logoData?.logoUrlSource && logoData?.isImageAllowedForNextImage ?
//             <LogoUsingNextImage logoUrl={logoData?.logoUrlSource} alt={'logo'}/> :
//             logoData?.logoUrlSource ?
//                 <img alt={'logo'} src={logoData?.logoUrlSource}/>
//                 : null}
//         {logoData.logoText && !logoData?.logoUrlSource ?
//             <span className='logo-text'> {logoData.logoText} </span>
//             : null
//         }
//         {logoData.headLineData ? <p className='logo-headline'>{logoData.headLineData}</p> : null}
//     </a>
// </Link>