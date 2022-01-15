import React, {useMemo, useState} from 'react';
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../../store/actions/globalStateActions";

const LogoStyledSpan = styled.span`
  .logo {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    max-width: 300px;
    max-height: 100px;
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
    const [gotError, setGotError] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const logoText = useMemo(()=>props.translations ? props.translations[router.locale] ? props.translations[router.locale].LogoText || props.LogoText : props.LogoText : props.LogoText,[]);
    const headLineData = useMemo(()=>props.translations ? props.translations[router.locale] ? props.translations[router.locale].headLine || props.headLine : props.headLine : props.headLine,[]);

    return (
        <LogoStyledSpan>
            <Link href='/' >
                <a className='logo' onClick={() => dispatch(setLoading(true))}>
                    {props.LogoUrl && !gotError ?
                        <img className={props.classNameValue}
                             alt={'logo'}
                             onMouseEnter={props.hoverHandler}
                             onMouseOver={props.hoverHandler}
                             onTouchStartCapture={props.hoverHandler}
                             onTouchEnd={props.hoverHandler}
                             src={props.LogoUrl}
                             onError={()=>setGotError(true)}
                        />
                        : null}
                    {logoText ? <span className='logo-text'> {logoText} </span>: null}
                    {headLineData ? <p className='logo-headline'>{headLineData}</p> : null}
                </a>
            </Link>
        </LogoStyledSpan>
    );
};

export default Logo;
