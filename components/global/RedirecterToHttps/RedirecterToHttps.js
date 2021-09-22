import React, {useEffect, useState, useRef} from 'react';

const RedirecterToHttps = props => {
    const redirectElement = useRef(null)
    const [state, setState] = useState({
        protocol: 'https',
        render: false,
        sslUrl: process.env.NEXT_PUBLIC_PRODUCTION_URL
    });

    useEffect(() => {

        if (typeof window !== 'undefined' ) {
            const siteUrl = window.location.href

            if (!siteUrl.includes('https') && process.env.REACT_APP_SSL === 'true') {
                setState({
                    ...state,
                    protocol: 'http',
                    render: true,
                })
            }
        }
    }, []);


    useEffect(() => {
        const clickOnRedirectLink= ()=>{
            redirectElement.current.click()
        }
        if (state.render && state.protocol === 'http' && redirectElement.current && process.env.REACT_APP_SSL === 'true'){

            // setTimeout(()=>{
            //     clickOnRedirectLink()
            // },100)

        }

    }, [state.render]);


    if (state?.render && props?.identity?.autoRedirectToHttps ) {

        return (
            <a ref={redirectElement} href={state.sslUrl} rel='noreferrer'>Redirect to HTTPS</a>
        );
    } else return null

};
export default RedirecterToHttps;
