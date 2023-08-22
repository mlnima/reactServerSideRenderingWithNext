import React, {FC,memo, useMemo} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";
import {UniqueDataTypes} from "typescript-types";


const Styles = styled.div`

  a {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    .logo-text, .logo-headline {
      color: var(--primary-text-color,#fff);
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

    const {logoUrlSource,  headLineData} = useMemo(() => {
        // Logo Url must get Deleted after live sites widget data reSet
        return {
            logoUrlSource: uniqueData?.logoUrl || LogoUrl,
            // logoText:  uniqueData?.translations?.[locale as string]?.logoText ?? (uniqueData?.logoText ||''),
            headLineData: uniqueData?.translations?.[locale as string]?.headLine ?? (uniqueData?.headLine || ''),
        }
    }, [])


    return (
        <Styles className={'logo-wrapper'}>
            <Link href='/' className='logo'>
                    {logoUrlSource && <img alt={'logo'} src={logoUrlSource}/> }
                    {/*{(!!logoText && !logoUrlSource) && <span className='logo-text'> {logoText ||''} </span>}*/}
                    {headLineData && <p className='logo-headline'>{headLineData}</p> }
            </Link>
        </Styles>

    );
};

export default memo(Logo);



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