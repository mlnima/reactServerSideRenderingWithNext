'use client';
import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import './FormHeader.scss'

interface IProps{
    locale: string,
    dictionary: {
        [key: string]: string
    }
}

const FormHeader: FC<IProps> = ({locale,dictionary}) => {

    const {loginRegisterFormPopup} = useAppSelector(({globalState}) => globalState);
    const dispatch = useAppDispatch();

    return (
        <div className='formHeader handle'>
            <div/>
            <h3 className='login-register-title'>
                {loginRegisterFormPopup === 'register' ?
                    dictionary['Register'] || 'Register' :
                    dictionary['Member login'] || 'Member login'
                }
            </h3>
            <button onClick={() => dispatch(loginRegisterForm(false))}
                    onTouchStart={() => dispatch(loginRegisterForm(false))}
                    className='close-form-button'
                    title={dictionary['Close']}>
                <FontAwesomeIcon icon={faXmark} style={{width: 30, height: 30}}/>
            </button>
        </div>
    )
};
export default FormHeader;