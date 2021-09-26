import React, {useEffect, useState, useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {AppContext} from "../../../context/AppContext";
import LanguagesSwitcher from "../widgets/LanguagesSwitcher/LanguagesSwitcher";
import {useRouter} from "next/router";
import {withTranslation} from "next-i18next";

const CookiePopup = props => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        accepted: true,
        render: false
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {

            if (localStorage.cookieAccepted !== 'true') {
                setState({
                    ...state,
                    accepted: false,
                    render: true
                })
            }
        }
    }, [props,router.locale,router.pathname]);


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

    if (props?.identity?.cookiePopupMessage && !state.accepted && state.render) {
        return (
            <span className='cookie-popup-parent'>
            <style jsx>{`
                .cookie-popup-parent{
                    position: fixed;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    align-items: center;

                }
                .cookie-popup-content{
                    background-color: var(--main-text-color);
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 280px;
                }
                
                h2,p{
                    color: var(--background-color,#000) ;
                    font-size: .8rem;
                }
                .cookie-popup-content-action-buttons{
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    margin: 20px 0;
                }
                .cookie-popup-content-action-button-accept{
                    background-color: green;
                    border: none;
                    outline:none;
                    padding: 10px 20px;
                    color: white;
                }
                .cookie-popup-content-action-button-reject{
                    background-color: red;
                    border: none;
                    outline:none;
                    padding: 10px 20px;
                    color: white;
                }
                .cookie-popup-content-action-read-more{
                    background-color: #61dafb;
                    border: none;
                    outline:none;
                    padding: 10px 20px;
                    color: white;
                }
                .cookie-popup-header{
                    display: flex;
                    justify-content: flex-end;
                }
            
            `}</style>
            <span className='cookie-popup-content'>
                <span className='cookie-popup-header'>
                    <LanguagesSwitcher cookiePage={true}/>
                </span>

              <h2>{props?.identity?.translations[contextData.state.activeLanguage]?.cookieTitleText || props?.identity?.cookieTitleText}</h2>
                <p>
                    {props?.identity?.translations[contextData.state.activeLanguage]?.cookieMessageText || props?.identity?.cookieMessageText}
                </p>
                <div className='cookie-popup-content-action-buttons'>
                      <button className='cookie-popup-content-action-button-reject' onClick={onRejectHandler}>
                          {props.t(`common:Decline`)}
                      </button>


                    <button className='cookie-popup-content-action-button-accept' onClick={onAcceptHandler}>
                          {props.t(`common:Accept`)}
                    </button>

                </div>
                {props?.identity?.cookieReadMoreLink ?
                    <Link href={props?.identity?.cookieReadMoreLink}><a className='cookie-popup-content-action-read-more' onClick={onAcceptHandler}>Accept and Read More</a></Link>
                    : null
                }
            </span>
        </span>
        );
    } else return null

};
export default withTranslation(['common'])(CookiePopup);
