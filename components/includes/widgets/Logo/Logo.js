import React, {useContext, useState, useEffect} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import {useRouter} from "next/router";
import Image from 'next/image'
import ImageRenderer from "../../ImageRenderer/ImageRenderer";

const Logo = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()

    const headLineData =   props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine
    const logoText = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText
    return (
        <Link href='/'
              // local={router.locale || router.query.locale || false}
        >
            <a className='logo'>
                {props.LogoUrl?<ImageRenderer imageUrl={props.LogoUrl}
                                              altValue='logo'
                                              imageWidth={300}
                                              imageHeight={100}
                                              quality={100}
                                              loading='lazy'
                />:null}

                {logoText? <span className='logo-text'>{logoText}</span>:null}
                {headLineData?<p >{headLineData}</p>:null}

            </a>
        </Link>
    );
};

export default Logo;
