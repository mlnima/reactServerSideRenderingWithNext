import React, {useEffect, useState, useRef} from 'react';

const RedirecterToHttps = () => {
    const redirectElement = useRef(null)
    const [state, setState] = useState({
        protocol: 'https',
        render: false,
        sslUrl: process.env.REACT_APP_PRODUCTION_URL
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const siteUrl = window.location.href
            if (!siteUrl.includes('https')) {
                setState({
                    ...state,
                    protocol: 'http',
                    render: true,
                    siteUrl:siteUrl.replace('http','https')
                })
            }
        }
    }, []);


    useEffect(() => {
        if (state.render && state.protocol === 'http' && redirectElement.current){
            //console.log(state.sslUrl.replace('http','https'))
          redirectElement.current.click()
        }

    }, [state.render]);


    if (state.render) {
        return (
            <a ref={redirectElement} href={state.sslUrl.replace('http','https')} rel='noreferrer'/>
        );
    } else return null

};
export default RedirecterToHttps;
