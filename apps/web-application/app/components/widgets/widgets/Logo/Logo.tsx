import React, {FC} from 'react';
import Link from "next/link";
import {UniqueDataTypes} from "@repo/typescript-types";

interface LogoPropTypes {
    uniqueData: UniqueDataTypes,
    LogoUrl?: string,
    locale: string,
}

const Logo: FC<LogoPropTypes> = ({uniqueData, LogoUrl, locale}) => {

    const logoUrlSource = uniqueData?.logoUrl || LogoUrl
    const logoText = uniqueData?.translations?.[locale as string]?.logoText || uniqueData?.logoText || ''
    const headLineData = uniqueData?.translations?.[locale as string]?.headLine || uniqueData?.headLine
    return (
        <div className={'logo'}>
            <Link href={locale === process.env.NEXT_PUBLIC_DEFAULT_LOCALE ? '/' : `/${locale}`} className={'logoLink'} aria-label={'logo'}>

                {uniqueData?.logoUrl &&
                    <img alt={'logo'}
                         className={'logoImage'}
                         style={{
                             width: `${uniqueData.width || 300}px`,
                             height: `${uniqueData.height || 100}px`,
                         }}
                         src={logoUrlSource}/>
                }
                {!!uniqueData?.logoText && !uniqueData?.logoUrlSource ?
                    <span className='logoText'> {logoText} </span>
                    : null
                }
                {!!uniqueData?.headLine && <p className={'logoHeadline'}>{headLineData}</p>}
            </Link>
        </div>

    );
};

export default Logo;
