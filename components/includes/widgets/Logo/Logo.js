import React, {useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import ImageRenderer from "../../ImageRenderer/ImageRenderer";
import {useRouter} from "next/router";

const Logo = props => {
    const router = useRouter()
    const contextData = useContext(AppContext);
    const logoText = props.translations ? props.translations[contextData.state.activeLanguage || router.locale] ? props.translations[contextData.state.activeLanguage || router.locale].LogoText || props.LogoText : props.LogoText : props.LogoText;
    const headLineData = props.translations ? props.translations[contextData.state.activeLanguage || router.locale] ? props.translations[contextData.state.activeLanguage || router.locale].headLine || props.headLine : props.headLine : props.headLine;
    const logoImageUrl = props.LogoUrl;

    return (
        <Link href='/' locale={router.locale||false}>
            <a className='logo' onClick={contextData.functions.loadingHandler}>
<style jsx>{`
.logo{
text-decoration: none;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
cursor: pointer;
max-width: 300px;
}
.logo-text {
font-size: xx-large;
}
.logo-text,.logo-headline{
color: var(--main-text-color);
}
`}</style>

                {logoImageUrl ?
                    <ImageRenderer imageUrl={logoImageUrl}
                                   altValue='logo'
                                   quality={100}
                                   loading='eager'
                                   layout='fill'
                                   classNameValue='logo-image'
                    /> : null}
                {logoText ?
                    <span className='logo-text'>
                        {logoText}
                    </span>
                    : null}
                {headLineData ? <p className='logo-headline'>{headLineData}</p> : null}
            </a>
        </Link>
    );
};

export default Logo;
