import React, {FC} from 'react';
import styled from "styled-components";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";

const ValidInputStyledDiv = styled.div`
  width: 20px;
  height: 20px;
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
        <ValidInputStyledDiv className='validator inputs-action'>
            {valid ?
                <FontAwesomeIcon color={'green'} icon={faCheck} style={{width: 20, height: 20}}/> :
                <FontAwesomeIcon color={'red'} icon={faXmark} style={{width: 20, height: 20}}/>
            }
        </ValidInputStyledDiv>
    );
};
export default ValidInput;
