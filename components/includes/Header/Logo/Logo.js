import React, { useContext, useState, useEffect } from 'react';
import Link from "next/link";
import { AppContext } from "../../../../context/AppContext";

const Logo = () => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        logoText: 'Logo',
        headLine: 'Head Line',
        logoTextStyle: {},
        headLineStyle: {}
    });

    useEffect(() => {
        setState({
            ...state,
            logoText: contextData.siteIdentity.logoText,
            headLine: contextData.siteIdentity.headLine,

            logoTextStyle: {
                color: contextData.siteDesign.textLogoColor,
                fontSize: contextData.siteDesign.textLogoSize
            },
            headLineStyle: {
                color: contextData.siteDesign.headLineColor,
                fontSize: contextData.siteDesign.headLineSize
            },

        })
    }, [ contextData.siteIdentity ]);

    const RenderLogo = () => {
        if (contextData.siteIdentity.imageLogo) {
            return (
                <img src='/static/images/logo/Logo.png'/>
            )
        } else return null
    }

    return (
        <Link href='/'>
            <div className='Logo'>
                <RenderLogo/>
                <span style={ state.logoTextStyle } className='logoText'>{ state.logoText }</span>
                <p style={ state.headLineStyle } className='headLine'>{ state.headLine }</p>
            </div>
        </Link>
    );
};

export default Logo;
