import React from 'react';
import Link from "next/link";
import ImageRenderer from "../../ImageRenderer/ImageRenderer";
import {useRouter} from "next/router";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";

const LogoStyledSpan = styled.span`
  .logo{
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
  }

`
const Logo = props => {
    const dispatch = useDispatch()
    const router = useRouter()
    const logoText = props.translations ? props.translations[router.locale] ? props.translations[router.locale].LogoText || props.LogoText : props.LogoText : props.LogoText;
    const headLineData = props.translations ? props.translations[router.locale] ? props.translations[router.locale].headLine || props.headLine : props.headLine : props.headLine;
    const logoImageUrl = props.LogoUrl;

    return (
        <LogoStyledSpan>
        <Link href='/' locale={router.locale || false}>
            <a className='logo' onClick={()=>dispatch(setLoading(true))}>
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
            </LogoStyledSpan>
    );
};

export default Logo;
