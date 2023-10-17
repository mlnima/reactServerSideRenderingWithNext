import React, {FC} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons/faCheck";
import './ValidInput.scss'

interface ValidInputPropTypes {
    valid: boolean | undefined
}

const ValidInput: FC<ValidInputPropTypes> = ({valid}) => {
    return (
        <div className='validator inputs-action'>
            {!!valid ?
                <FontAwesomeIcon color={'green'} icon={faCheck} style={{width: 20, height: 20}}/> :
                <FontAwesomeIcon color={'red'} icon={faXmark} style={{width: 20, height: 20}}/>
            }
        </div>
    );
};
export default ValidInput;
