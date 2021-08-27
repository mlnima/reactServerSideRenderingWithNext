import React, {useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import ImageRenderer from "../../ImageRenderer/ImageRenderer";
import {useRouter} from "next/router";
import styled from "styled-components";

const LogoStyledLink = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  max-width: 300px;
  cursor: pointer;
  .logo-text {
    font-size: xx-large;
  }

  .logo-text, .logo-headline {
    color: var(--main-text-color);
  }

  .logo-headline {
    margin: 0 5px;
  }
`
const Logo = props => {
    const router = useRouter()
    const contextData = useContext(AppContext);
    const logoText = props.translations ? props.translations[contextData.state.activeLanguage || router.locale] ? props.translations[contextData.state.activeLanguage || router.locale].LogoText || props.LogoText : props.LogoText : props.LogoText;
    const headLineData = props.translations ? props.translations[contextData.state.activeLanguage || router.locale] ? props.translations[contextData.state.activeLanguage || router.locale].headLine || props.headLine : props.headLine : props.headLine;
    const logoImageUrl = props.LogoUrl;

    return (
        <Link href='/' locale={router.locale || false}>
            <LogoStyledLink className='logo' onClick={contextData.functions.loadingHandler}>
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
            </LogoStyledLink>
        </Link>
    );
};

export default Logo;
