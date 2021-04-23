import React, {useContext, useMemo, useEffect, useState} from 'react';
import Link from "next/link";
import {AppContext} from "../../../../context/AppContext";
import ImageRenderer from "../../ImageRenderer/ImageRenderer";
import styled from "styled-components";
let StyledA = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  .logo-text {
    font-size: xx-large;
  }
  .headLine {

  }
`

const Logo = props => {
    const contextData = useContext(AppContext);
    const [logoText, setLogoText] = useState('')
    const [headLineData, setHeadLineData] = useState('')
    const [logoImageUrl, setLogoImageUrl] = useState('')

    useEffect(() => {
        if (!props.referer) {
            setLogoText(props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText)
            setHeadLineData(props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine)
            setLogoImageUrl(props.LogoUrl)
        }
    }, [props]);


    useEffect(() => {
        if (props.referer) {
            setLogoText(props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].LogoText || props.LogoText : props.LogoText : props.LogoText)
            setHeadLineData(props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].headLine || props.headLine : props.headLine : props.headLine)
        }
    }, [contextData.state.activeLanguage]);

    return (
        <Link href='/'>
            <StyledA className='logo' onClick={contextData.functions.loadingHandler}>
                {logoImageUrl ?
                    <ImageRenderer imageUrl={logoImageUrl}
                                   altValue='logo'
                                   imageWidth={300}
                                   imageHeight={100}
                                   quality={100}
                                   loading='lazy'
                /> : null}
                {logoText ? <span className='logo-text'>{logoText}</span> : null}
                {headLineData ? <p>{headLineData}</p> : null}
            </StyledA>
        </Link>
    );
};

export default Logo;
