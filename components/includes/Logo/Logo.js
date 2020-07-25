import React, {useContext, useState, useEffect} from 'react';
import Link from "next/link";
import {AppContext} from "../../../context/AppContext";
import {getLanguageQuery} from "../../../_variables/_variables";

const Logo = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        logoText: 'Logo',
        headLine: 'Head Line',
        logoTextStyle: {},
        headLineStyle: {},
        queries:{}
    });

    useEffect(() => {
        setState({
            ...state,
            logoText: contextData.siteIdentity.logoText,
            headLine: contextData.siteIdentity.headLine,

            logoTextStyle: {
                color: props.logoTextColor || 'white',
                fontSize: props.logoTextFontSize + 'px' || '50px'
            },
            headLineStyle: {
                color: props.logoHeadLineColor || 'white',
                fontSize: props.logoHeadLineFontSize + 'px' || '16px'
            },


        })
    }, [contextData.siteIdentity]);


    // useEffect(() => {
    //     setState({
    //         ...state,
    //         queries: {...getLanguageQuery(window.location.search)}
    //     })
    //
    // }, [props]);

    const RenderLogo = () => {
        if (props.LogoUrl) {
            return (
                <img src={props.LogoUrl}/>
            )
        } else return null
    }

    return (
        <Link href={{
            pathname: props.redirectLink,
            query: state.queries
        }}>
            <a className='Logo'>
                <RenderLogo/>
                <span style={state.logoTextStyle} className='logoText'>{props.LogoText}</span>
                <p style={state.headLineStyle} className='headLine'>{props.headLine}</p>
            </a>
        </Link>
    );
};

export default Logo;
