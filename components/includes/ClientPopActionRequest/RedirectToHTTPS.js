import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../context/AppContext";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

const RedirectToHTTPS = props => {
    const contextData = useContext(AppContext);

    const [state, setState] = useState({
        render: false,
        protocol: 'https',
        currentUrl: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const siteUrl = window.location.href
            if (!siteUrl.includes('https') && process.env.REACT_APP_SSL === 'true') {
                setState({
                    ...state,
                    protocol: 'http',
                    render: true,
                    currentUrl: siteUrl
                })
            }
        }
    }, []);

    if (state.render && props?.identity?.data?.redirectToSSLPop) {
        console.log(state.render , props?.identity?.data?.redirectToSSLPop)
        return (
            <span className='redirect-to-https-action-message'>
            <style jsx>{`
                .redirect-to-https-action-message{
                    position: fixed;
                    bottom: 0;
                    left: 15vw;
                    right:15vw ;
                    height: 150px;
                    background-color: var(--main-text-color);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding:30px 10px;
                }
                .redirect-to-https-message{
                    color: var(--background-color) ;
                    text-align: center;
                }
                .redirect-to-https-buttons{
                    display: flex;
                    margin-bottom:20px;
                }
                .redirect-to-https-link,.redirect-to-https-close-message{
                    background-color: green;
                    color: white;
                    padding: 5px 10px;
                    border: none;
                    outline: none;
                    margin: 0 20px;
                }
            `}</style>

                  <img src="/static/images/ssl/ssl.png" alt="ssl message logo"/>
                  <p className='redirect-to-https-message'>we would like to redirect you to secure version of this site. some of features may not work if you stay on this connection protocol </p>
                  <div className='redirect-to-https-buttons'>
                       <button className='redirect-to-https-close-message' onClick={() => setState({...state, render: false})}><FontAwesomeIcon style={{width: '30px', height: '20px'}} icon={faTimes}/></button>
                       <a className='redirect-to-https-link' href={state.currentUrl.replace('http', 'https')} rel='noreferrer'><FontAwesomeIcon style={{width: '30px', height: '20px'}} icon={faCheck} className=''/></a>
                  </div>
              </span>
        );
    } else return null
};
export default RedirectToHTTPS;
