import React, {useEffect, useState, useContext, useRef} from 'react';

let deferredPrompt;

const PwaInstallButton = props => {
    const installButton = useRef(null)
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    const [state, setState] = useState({
        render: true
    });

    // useEffect(() => {
    //     if (typeof window !== 'undefined'){
    //
    //         const handler = e => {
    //             e.preventDefault();
    //             setSupportsPWA(true);
    //             setPromptInstall(e);
    //         };
    //         window.addEventListener("beforeinstallprompt", handler);
    //
    //         return () => window.removeEventListener("transitionend", handler);
    //     }
    // }, []);


    const onLoadHandler = ()=>{

        // if (typeof window !== 'undefined'){
        //
        //     const handler = e => {
        //         e.preventDefault();
        //         setSupportsPWA(true);
        //         setPromptInstall(e);
        //     };
        //     window.addEventListener("beforeinstallprompt", handler);
        //
        //     return () => window.removeEventListener("transitionend", handler);
        // }
    }

    const onClickHandler = e => {

        e.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    }


    if (state.render) {
        return (
            <button onClick={onClickHandler}
                    ref={installButton}
                    onLoad={()=>onLoadHandler()}
                    className="link-button"
                    id="setup_button"
                    aria-label="Install app"
                    title="Install app"
            >
                install
            </button>
        );
    } else return null

};
export default PwaInstallButton;
