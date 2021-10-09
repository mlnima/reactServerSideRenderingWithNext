import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
const ValidInputStyledDiv = styled.div`
  width: 4%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`

const ValidInput = ({valid}:{valid:boolean|undefined}) => {
    return (
        <ValidInputStyledDiv className='validator'> {
            valid ?
                <FontAwesomeIcon icon={faCheck} style={{color:'green'}}/> :
                <FontAwesomeIcon icon={faTimes}  style={{color:'red'}}/>
        }</ValidInputStyledDiv>
    );
};
export default ValidInput;
