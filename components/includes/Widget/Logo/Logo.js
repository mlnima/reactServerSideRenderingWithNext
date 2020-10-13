import React, {useContext, useState, useEffect} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import {getLanguageQuery} from "../../../../_variables/_variables";
import {useRouter} from "next/router";

const Logo = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        logoText: 'Logo',
        headLine: 'Head Line',
        logoTextStyle: {},
        headLineStyle: {},
        queries: {}
    });

    // useEffect(() => {
    //     setState({
    //         ...state,
    //         logoText: contextData.siteIdentity.logoText,
    //         headLine: contextData.siteIdentity.headLine,
    //
    //         logoTextStyle: {
    //             color: props.logoTextColor || 'white',
    //             fontSize: props.logoTextFontSize + 'px' || '50px',
    //
    //         },
    //         headLineStyle: {
    //             color: props.logoHeadLineColor || 'white',
    //             fontSize: props.logoHeadLineFontSize + 'px' || '16px',
    //             fontWeight: props.logoHeadLineFontWeight || 'initial'
    //         },
    //
    //
    //     })
    // }, [contextData.siteIdentity]);


    const RenderLogoImage = () => {
        if (props.LogoUrl) {
            return (
                <img src={props.LogoUrl} alt='logo'/>
            )
        } else return null
    }

    const RenderLogoText = () => {
        const value = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText
        if (value) {
            return (
                <span style={state.logoTextStyle} className='logo-text'>{value}</span>
            )
        } else return null
    }


    const RenderHeadLine = () => {
        const value = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine
        if (value) {
            if (router.pathname === '/') {
                return (
                    <h1 >{value}</h1>
                )
            } else {
                return (
                    <p >{value}</p>
                )
            }
        } else return null

    }

    return (
        <Link href='/'>
            <a className='logo'>
                <RenderLogoImage/>
                <RenderLogoText/>
                <RenderHeadLine/>
            </a>
        </Link>
    );
};

export default Logo;
