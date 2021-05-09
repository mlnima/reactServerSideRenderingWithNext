import React, {useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import parse from 'html-react-parser';
const contextData = useContext(AppContext);

const Text = props => {
    const spanElement = useRef(null)
    const textData = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].text || props.text : props.text : props.text
    const data = parse(textData)
    return (
        <div className='widgetText'
             ref={spanElement} >
            {data}

        </div>
    );
};
export default Text;
