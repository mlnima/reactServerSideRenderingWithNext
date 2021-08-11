import React, {useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import parse from 'html-react-parser';


const Text = props => {
    const contextData = useContext(AppContext);
    const spanElement = useRef(null)
    const textData = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].text || props.text : props.text : props.text
    const data = parse(textData)
    return (
        <div className='widgetText' ref={spanElement} >
            <style jsx>{`
                .widgetText{
                color:var(--main-text-color);
                width:clamp(45ch,90%,75ch);
                text-align: center;
                margin: auto;
                max-width: 100vw;
                }
            @media only screen and (min-width: 768px) {
                .widgetText{
                color:var(--main-text-color);
                width:clamp(45ch,50%,75ch);
                }
            }
            `}</style>
            {data}

        </div>
    );
};
export default Text;
