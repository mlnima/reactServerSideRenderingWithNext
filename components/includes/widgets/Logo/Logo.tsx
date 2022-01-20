import React, {useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from "next/router";

import isInternalUrl from "../../../../_variables/util/isInternalUrl";
import isImageAllowedForNextImage from "../../../../_variables/util/isImageAllowedForNextImage";
import LogoUsingNextImage from "./LogoUsingNextImage";
import isAbsolutePath from "../../../../_variables/util/isAbsolutePath";

const LogoStyledLink = styled(Link)`
 
`

interface LogoPropTypes {
    translations: {},
    LogoText: string,
    headLine: string,
    LogoUrl: string,
    hoverHandler: any,
}

const Logo: React.FC<LogoPropTypes> = ({translations, LogoText, headLine, LogoUrl, hoverHandler}) => {
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
        <LogoStyledLink href='/'>
            <a className='logo'>
                {logoUrlSource && logoData.isImageAllowedForNextImage ?
                    <LogoUsingNextImage logoUrl={logoUrlSource} alt={'logo'}/>:
                    logoUrlSource?
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
        </LogoStyledLink>
    );
};

export default Logo;
