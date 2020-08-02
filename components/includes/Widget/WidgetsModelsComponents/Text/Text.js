import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";

const Text = props => {
    const spanElement = useRef(null)
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        textAlign: props.textAlign || 'center',
        style: {
            textAlign: props.textAlign || 'center'
        }
    });

    useEffect(() => {
        if (spanElement) {
            spanElement.current.innerHTML = props.text
        }
    }, []);


    return (
        <span className='widgetText' ref={spanElement} style={state.style}>
            {
                // props.text

                props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].text || props.text : props.text : props.text


            }
        </span>
    );
};
export default Text;
