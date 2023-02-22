import React, {FC} from "react";
import styled from "styled-components";
import {useAppDispatch} from "@store_toolkit/hooks";
import useTranslation from "next-translate/useTranslation";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const Style = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  padding: 8px 0;
  cursor: pointer;
  h3{
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .close-form-button {
    background-color: transparent;
    color: var(--main-text-color, #fff);
    border: none;
    padding: 0;
    height: 30px;
    width: 30px;
  }
`;

interface PropTypes {
}

const FormHeader: FC<PropTypes> = ({}) => {
    const {loginRegisterFormPopup} = useSelector(({globalState}: Store) => globalState)
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch()
    return (
        <Style className='form-header handle'>
            <div/>
            <h3 className='login-register-title'>
                {loginRegisterFormPopup === 'register' ?
                    t<string>(`Register`) :
                    t<string>(`Member login`)
                }
            </h3>
            <button onClick={() => dispatch(loginRegisterForm(false))}
                    onTouchStart={() => dispatch(loginRegisterForm(false))}
                    className='close-form-button' title={t(`Close`)}>
                <FontAwesomeIcon icon={faXmark} style={{width:30,height:30}}/>
            </button>
        </Style>
    )
};
export default FormHeader;