'use client';
import React, {FC, useEffect, useState} from 'react';
import './CookiesInformerBar.styles.scss'

const CookiesInformerBar: FC = () => {
    const [renderCookiesBar, setRenderCookiesBar] = useState(false)

    useEffect(() => {
        const isAccepted = localStorage.getItem('cookieAccepted');
        if (isAccepted !== 'true') {
            setRenderCookiesBar(true)
        }
    }, []);

    const onAcceptHandler = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setRenderCookiesBar(false)
    };

    if (!renderCookiesBar) return null

    return (
        <div id={'cookiePopupWrapper'}>
            <p>
                This website collects cookies to deliver better user experience
            </p>
            <button className={'btn btn-primary'} onClick={onAcceptHandler}>
                OK
            </button>
        </div>
    );

};

export default CookiesInformerBar;
