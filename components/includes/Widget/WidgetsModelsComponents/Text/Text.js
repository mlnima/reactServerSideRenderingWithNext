import React, {useRef} from 'react';
import parse from 'html-react-parser';
import styled from "styled-components";
import {useRouter} from "next/router";

const TextStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 100vw;
  @media only screen and (min-width: 768px) {
    color: var(--main-text-color);
  }
`

const Text = props => {
    const router = useRouter();
    const spanElement = useRef(null);
    const textData = props.translations ? props.translations[router.locale] ? props.translations[router.locale].text || props.text : props.text : props.text;
    const data = parse(textData);

    return (
        <TextStyledDiv className='widgetText' ref={spanElement}>
            {data}
        </TextStyledDiv>
    );
};
export default Text;
