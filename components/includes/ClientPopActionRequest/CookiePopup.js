import React, {useEffect, useState, useContext} from 'react';
import Link from "next/link";
import {AppContext} from "../../../context/AppContext";
import LanguagesSwitcher from "../widgets/LanguagesSwitcher/LanguagesSwitcher";
import {withTranslation} from "next-i18next";
import {useSelector} from "react-redux";

import styled from "styled-components";

const CookiePopupStyledDiv = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  z-index: 1005;

  .cookie-popup-content {
    background-color: var(--main-text-color);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 280px;

    .cookie-popup-header {
      display: flex;
      justify-content: flex-end;
    }

    h2, p {
      color: var(--main-background-color, #000);
      font-size: .8rem;
    }

    .cookie-popup-content-action-buttons {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      margin: 20px 0;

      .cookie-popup-content-action-button-accept {
        background-color: green;
        border: none;
        outline: none;
        padding: 10px 20px;
        color: white;
      }

      .cookie-popup-content-action-button-reject {
        background-color: red;
        border: none;
        outline: none;
        padding: 10px 20px;
        color: white;
      }


    }

    .cookie-popup-content-action-read-more {
      background-color: #61dafb;
      border: none;
      outline: none;
      padding: 10px 20px;
      color: white;
    }
  }

`
const CookiePopup = props => {
    const settings = useSelector(state => state.settings)
    const globalState = useSelector(state => state.globalState)
    const contextData = useContext(AppContext);
    // const router = useRouter()
    const [state, setState] = useState({
        accepted: false,
        render: true
    });

    const onAcceptHandler = () => {
        localStorage.cookieAccepted = true
        setState({
            ...state,
            accepted: true,
            render: false
        })
    }

    const onRejectHandler = () => {
        if (typeof window !== 'undefined') {
            window.location.href = 'https://www.google.com/'
        }
    }

    // useEffect(() => {
    //     console.log(contextData.state.activeLanguage)
    //     console.log(settings?.identity?.cookiePopupMessage)
    //     console.log(globalState)
    // }, [props]);

    if (settings?.identity?.cookiePopupMessage && !state.accepted) {
        return (
            <CookiePopupStyledDiv className='cookie-popup-parent'>
            <span className='cookie-popup-content'>
                <span className='cookie-popup-header'>
                    <LanguagesSwitcher cookiePage={true}/>
                </span>

              <h2>{settings?.identity?.translations[contextData.state.activeLanguage]?.cookieTitleText || settings?.identity?.cookieTitleText}</h2>
                <p>
                    {settings?.identity?.translations[contextData.state.activeLanguage]?.cookieMessageText || settings?.identity?.cookieMessageText}
                </p>
                <div className='cookie-popup-content-action-buttons'>
                      <button className='cookie-popup-content-action-button-reject' onClick={onRejectHandler}>
                          {props.t(`common:Decline`)}
                      </button>


                    <button className='cookie-popup-content-action-button-accept' onClick={onAcceptHandler}>
                          {props.t(`common:Accept`)}
                    </button>

                </div>
                {settings?.identity?.cookieReadMoreLink ?
                    <Link href={settings?.identity?.cookieReadMoreLink}><a className='cookie-popup-content-action-read-more' onClick={onAcceptHandler}>Accept and Read More</a></Link>
                    : null
                }
            </span>
            </CookiePopupStyledDiv>
        );
    } else return null

};
export default withTranslation(['common'])(CookiePopup);
