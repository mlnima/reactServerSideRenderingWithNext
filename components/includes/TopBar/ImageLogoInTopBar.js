import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";
import Link from "next/link";

const ImageLogoInTopBar = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);


    if (contextData.siteIdentity.imageLogoInTopBar && contextData.siteIdentity.imageLogoInTopBarUrl ){
        return (
            <Link href='/'>
                <a className='site-logo-top-bar'>
                <img  src={contextData.siteIdentity.imageLogoInTopBarUrl} alt=""/>
                </a>
            </Link>

        );
    }else return null

};
export default ImageLogoInTopBar;
