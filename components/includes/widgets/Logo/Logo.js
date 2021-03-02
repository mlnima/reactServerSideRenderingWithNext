import React, {useContext, useState, useEffect} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import {getLanguageQuery} from "../../../../_variables/_variables";
import {useRouter} from "next/router";
import Image from 'next/image'

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

    const RenderLogoImage = () => {
        let renderNormalImageElement = props.LogoUrl.includes('http')
        if (props.LogoUrl) {
            if (renderNormalImageElement){
                return (
                    <img src={props.LogoUrl} alt='logo'/>
                )
            }else{
                return (
                    <Image
                        src={props.LogoUrl}
                        alt='logo'
                        width={300}
                        height={100}
                        quality={50}
                        layout='intrinsic'
                        loading='eager'
                        lazy='true'
                        onError={()=>{
                            renderNormalImageElement = true
                        }}
                    />
                )
            }

        } else return null
    }

    const RenderLogoText = () => {
        const value = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText
        if (value) {
            return (
                <span className='logo-text'>{value}</span>
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
        <Link href='/' as='/'>
            <a className='logo'>
                <RenderLogoImage/>
                <RenderLogoText/>
                <RenderHeadLine/>
            </a>
        </Link>
    );
};

export default Logo;
