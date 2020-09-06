import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";

const Text = props => {
    const spanElement = useRef(null)
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        style: {},
        textData: ''
    });


    useEffect(() => {
        setState({
            ...state,
            style: {
                textAlign: props.textAlign || 'center',
                color: props.textColor || 'white',
            },
            textData: props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].text || props.text : props.text : props.text
        })
    }, [props]);


    useEffect(() => {
        spanElement.current.innerHTML = state.textData
    }, [state]);

    return (
        <p className='widgetText' ref={spanElement} style={state.style}>
        </p>
    );
};
export default Text;
