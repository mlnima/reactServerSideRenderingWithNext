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

    const dispatch = useAppDispatch();
    const {loginRegisterFormPopup} = useAppSelector(({globalState}) => globalState);
    const {anyoneCanRegister} = useAppSelector(({settings}) => settings?.initialSettings?.membershipSettings);

    return (
        <div className='formHeader handle'>

            <div className={'switchForms'}>
                <button onClick={()=>dispatch(loginRegisterForm('login'))}
                        onTouchStart={()=>dispatch(loginRegisterForm('login'))}
                className={`switchFormsTab ${loginRegisterFormPopup === 'login' ? 'activeTab' : 'inactiveTab'}`}>
                    {dictionary['Login'] || 'Login'}
                </button>
                {anyoneCanRegister &&
                    <button onClick={()=>dispatch(loginRegisterForm('register'))}
                            onTouchStart={()=>dispatch(loginRegisterForm('register'))}
                            className={`switchFormsTab ${loginRegisterFormPopup === 'register' ? 'activeTab' : 'inactiveTab'}`}>
                        {dictionary['Register'] || 'Register'}
                    </button>
                }
            </div>

            <button onClick={() => dispatch(loginRegisterForm(false))}
                    onTouchStart={() => dispatch(loginRegisterForm(false))}
                    className='closeFormButton'
                    title={dictionary['Close']}>
                <FontAwesomeIcon icon={faXmark} style={{width: 30, height: 30}}/>
            </button>
        </div>
    )
};
export default FormHeader;