import React, {FC} from 'react';
import Link from "next/link";
import {UniqueDataTypes} from "typescript-types";

interface LogoPropTypes {
    uniqueData: UniqueDataTypes,
    translations: {},
    LogoUrl: string,
    locale: string,
}

const Logo: FC<LogoPropTypes> = ({uniqueData,LogoUrl,locale}) => {

    const logoUrlSource = uniqueData?.logoUrl || LogoUrl
    const logoText = uniqueData?.translations?.[locale as string]?.logoText || uniqueData?.logoText || ''
    const headLineData = uniqueData?.translations?.[locale as string]?.headLine || uniqueData?.headLine

    return (
        <div className={'logo'}>
            <Link href='/' className={'logo-link'}>
                    {uniqueData?.logoUrl && <img alt={'logo'} src={logoUrlSource}/> }
                    {uniqueData?.logoText && !uniqueData?.logoUrlSource ?
                        <span className='logo-text'> {logoText} </span>
                        : null
                    }
                    {uniqueData?.headLine && <p className='logo-headline'>{headLineData}</p> }
            </Link>
        </div>

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