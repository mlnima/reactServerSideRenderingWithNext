import React, {useEffect, useState, useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {AppContext} from "../../../context/AppContext";
import LanguagesSwitcher from "../widgets/LanguagesSwitcher/LanguagesSwitcher";
import {useRouter} from "next/router";

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
                    //width: clamp(300px , 600px, 80vw);
                    width: 280px;
                }
                
                h2,p{
                    color: var(--background-color) ;
                    font-size: .8rem;
                }
                .cookie-popup-content-action-buttons{
                    display: flex;
                    justify-content: space-evenly;
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
                          <FontAwesomeIcon style={{width: '30px', height: '20px'}} icon={faTimes}/>
                      </button>
                    {props?.identity?.cookieReadMoreLink ?
                        <Link href=""><a className='cookie-popup-content-action-read-more'> Read More</a></Link>
                        : null
                    }

                    <button className='cookie-popup-content-action-button-accept' onClick={onAcceptHandler}>
                          <FontAwesomeIcon style={{width: '30px', height: '20px'}} icon={faCheck}/>
                    </button>

                </div>
            </span>
        </span>
        );
    } else return null

};
export default CookiePopup;
