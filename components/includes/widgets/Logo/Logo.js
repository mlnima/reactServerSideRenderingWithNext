import React, {useContext,useMemo} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import ImageRenderer from "../../ImageRenderer/ImageRenderer";

const Logo = props => {
    const contextData = useContext(AppContext);
    // const headLineData =   props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine
    // const logoText = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText
    const headLineData = useMemo(() => {
        return props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine
    }, [contextData.state.activeLanguage])
    const logoText = useMemo(() => {
        return props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText
    }, [contextData.state.activeLanguage])
    const logoImageUrl = useMemo(() => {
        return props.LogoUrl
    }, [])

    return (
        <Link href='/'
            // local={router.locale || router.query.locale || false}
        >
            <a className='logo'>
                {logoImageUrl? <ImageRenderer imageUrl={logoImageUrl}
                                                altValue='logo'
                                                imageWidth={300}
                                                imageHeight={100}
                                                quality={100}
                                                loading='lazy'
                /> : null}

                {logoText ? <span className='logo-text'>{logoText}</span> : null}
                {headLineData ? <p>{headLineData}</p> : null}

            </a>
        </Link>
    );
};

export default Logo;
