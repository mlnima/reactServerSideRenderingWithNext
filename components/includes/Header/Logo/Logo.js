import React,{useContext,useState,useEffect} from 'react';
import Link from "next/link";
import { AppContext } from "../../../../context/AppContext";

const Logo = () => {
    const contextData = useContext(AppContext);
        const [state, setState] = useState({
            logoText:contextData.siteIdentity.logoText || 'Logo',
            headLine:contextData.siteIdentity.headLine || 'Head Line'
        });

        useEffect(()=>{
            setState({...state,
                logoText:contextData.siteIdentity.logoText,
                headLine:contextData.siteIdentity.headLine
            })
        },[ contextData.siteIdentity]);

    return (
        <Link href='/'>
            <div className='Logo'>
                <img src='/static/images/logo/Logo.png'/>
                <span className='logoText'>{state.logoText}</span>
                <p className='headLine'>{state.headLine}</p>

            </div>
        </Link>
    );
};

export default Logo;
