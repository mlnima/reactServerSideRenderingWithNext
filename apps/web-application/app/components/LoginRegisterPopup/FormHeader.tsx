'use client';
import React, {FC} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";

const Style = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  padding: 8px 0;
  cursor: pointer;

  h3 {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close-form-button {
    background-color: transparent;
    color: var(--primary-text-color,#fff);
    border: none;
    padding: 0;
    height: 30px;
    width: 30px;
  }
`;

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
        <Style className='form-header handle'>
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
        </Style>
    )
};
export default FormHeader;