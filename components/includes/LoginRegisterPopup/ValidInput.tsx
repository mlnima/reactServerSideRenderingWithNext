import React, {FC} from 'react';
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

interface ValidInputPropTypes {
    valid: boolean | undefined
}

const ValidInput: FC<ValidInputPropTypes> = ({valid}) => {
    return (
        <ValidInputStyledDiv className='validator'> {
            valid ?
                //@ts-ignore
                <FontAwesomeIcon icon={faCheck} style={{color: 'green'}}/> :
                //@ts-ignore
                <FontAwesomeIcon icon={faTimes} style={{color: 'red'}}/>
        }</ValidInputStyledDiv>
    );
};
export default ValidInput;
