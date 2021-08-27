import React, {useContext, useRef} from 'react';
import {AppContext} from "../../../../../context/AppContext";
import parse from 'html-react-parser';

import styled from "styled-components";
const TextStyledDiv = styled.div`
  color:var(--main-text-color);
  max-width: 100vw;
  @media only screen and (min-width: 768px) {
    color:var(--main-text-color);
  }
`

const Text = props => {
    const contextData = useContext(AppContext);
    const spanElement = useRef(null)
    const textData = props.translations ? props.translations[contextData.state.activeLanguage] ? props.translations[contextData.state.activeLanguage].text || props.text : props.text : props.text
    const data = parse(textData)
    return (
        <TextStyledDiv className='widgetText' ref={spanElement} >
            {data}
        </TextStyledDiv>
    );
};
export default Text;
