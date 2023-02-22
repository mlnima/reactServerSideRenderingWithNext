import React, {useState, useEffect, FC} from 'react';
import useTranslation from 'next-translate/useTranslation'
import {useSelector} from 'react-redux';
import styled from "styled-components";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import Draggable from 'react-draggable';
import _passwordValidator from "@_variables/_clientVariables/clientVariables/_passwordValidator";
import ValidInput from "./ValidInput";
import {fetchLogin, fetchUserRegister} from "@store_toolkit/clientReducers/userReducer";
import {setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import FormHeader from "@components/includes/LoginRegisterPopup/FormHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";

const LoginRegisterPopupFormsStyledDiv = styled.div`
  background-color: var(--secondary-background-color, #181818);
  width: 100%;
  max-width: 320px;
  padding: 5px;
  box-sizing: border-box;
  color: var(--main-text-color, #fff);
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  .login-register-switch-form-button {
    border: none;
    color: var(--main-text-color);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin: 20px 0;
  }

  .login-register-form {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .login-register-form-fields {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .login-register-form-field {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        
        p {
          margin: 0;
        }

        .password-info {
          color: var(--main-active-color);
          font-size: 10px;
          padding: 5px 0;
          width: 100%;
        }

        .input-validator{
          width: 100%;
          position: relative;
          input {
            width: 100%;
            box-sizing: border-box;
            border: none;
          }

          .inputs-action {
            position: absolute;
            right: 2px;
            top: 5px;
           
            background-color: transparent;
            color: var(--main-text-color, #fff);
            border: none;
          }
          .show-password-wrapper {
            cursor: pointer;
          }
        }
      }
      
      .gender {
        display: flex;
        justify-content: flex-start;
        gap: 0 10px;
        .gender-options {
          display: flex;
          align-items: center;
          //width: 100%;

          input {
            //width: 100%;
          }

          .gender-icon {
            color: var(--main-text-color);
            padding: 0;
            margin: 0 20px 0 0;
          }
        }
      }
    }

    .login-register-form-button {
      border: none;
      background-color: var(--main-active-color, #f90);
      color: var(--secondary-background-color, #181818);
      font-weight: bold;
      font-size: 18px;
      padding: 10px 0;
      width: 95%;
      margin: 10px;
      text-align: center;
    }
  }

  .btn-secondary {
    justify-self: center;
    align-self: center;
    font-size: 12px;
  }
`

interface ResponseTypes {
    message?: string,
    type?: string,
}

interface StateTypes {
    username?: string,
    email?: string,
    password?: string,
    password2?: string,
    gender?: string,
}

interface StateValidatorTypes {
    username?: boolean,
    email?: boolean,
    password?: boolean,
    password2?: boolean,
    gender?: boolean,
}

const LoginRegisterPopupForms: FC = () => {
    // const passwordRef = useRef()
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch()
    const globalState = useSelector(({globalState}: Store) => globalState)

    const [submitButtonDisable, setSubmitButtonDisable] = useState(true)
    const [state, setState] = useState<StateTypes>({
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const [stateValidator, setStateValidator] = useState<StateValidatorTypes>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [response, setResponse] = useState<ResponseTypes>({});

    const onChangeHandler = (e: React.FormEvent<HTMLDivElement | HTMLFormElement>) => {
        setState({
            ...state,
            // @ts-ignore
            [e.target.name]: e.target.value
        } as { [key: string]: string })
    };


    const onrResetStateHandler = () => {
        setState({
            username: '',
            email: '',
            password: '',
            password2: '',
        })
    };

    // const showPasswordChangeHandler = () =>{
    //     showPassword?
    //     setShowPassword(!showPassword)
    // }

    const onLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fetchLogin({username: state.username, password: state.password}))
    };


    const onRegisterHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const checkUsername = state.username ? state.username.length <= 16 && state?.username?.length >= 6 && (/[a-zA-Z]/).test(state.username) : false
        const checkPasswords = state.password === state.password2;

        if (!checkUsername) {
            dispatch(setAlert({message: 'you can not use this username', type: 'error', active: true}))
        }

        if (!checkPasswords) {
            dispatch(setAlert({message: 'password is to short or is not match', type: 'error', active: true}))
        }

        if (checkUsername && checkPasswords) {
            dispatch(fetchUserRegister({data: state}))
        }


    };


    useEffect(() => {
        setStateValidator({
            username: state.username ? state?.username?.length <= 16 &&
                state?.username?.length >= 6 &&
                (/[a-zA-Z]/).test(state.username) &&
                (/^((?!admin).)*$/i).test(state.username) || (
                    globalState.loginRegisterFormPopup === 'login' &&
                    state.username === 'dashboard'
                ) : false,
            email: state.email ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(state.email) : false,
            password: state.password ? _passwordValidator(state.password) : false,
            password2: state.password2 ? state.password === state.password2 : false,
            gender: state.gender ? state.gender === 'male' || state.gender === 'female' || state.gender === 'other' : false,
        })
    }, [state]);

    return (
        <Draggable handle='.handle'>
            <LoginRegisterPopupFormsStyledDiv className='login-register-content'
                // response={response}

            >

                <FormHeader/>


                {globalState.loginRegisterFormPopup === 'register' ?
                    <form className='login-register-form' onSubmit={e => onRegisterHandler(e)}>
                        <div className="login-register-form-fields">
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input className={'form-control-input form-control-input-validator'}
                                           required={true}
                                           name='username'
                                           value={state.username}
                                           placeholder={t<string>(`Username`)}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.username}/>
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input className={'form-control-input form-control-input-validator'}
                                           autoComplete="off"
                                           required={true}
                                           name='email'
                                           value={state.email}
                                           type='email'
                                           placeholder={t<string>(`Email`)}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.email}/>
                                </div>
                            </div>
                            <div className="login-register-form-field gender">
                                <p>{t<string>(`Gender`)}:</p>
                                <div className='gender-options'
                                     onChange={e => onChangeHandler(e)}>
                                    <input type='radio'
                                           name='gender'
                                           value='male'
                                           checked={state.gender === 'male'}
                                    />
                                    <p className='gender-icon'>{t<string>(`Male`)}</p>
                                    <input type='radio'
                                           name='gender'
                                           value='female'
                                           checked={state.gender === 'female'}
                                    />
                                    <p className='gender-icon'>{t<string>(`Female`)}</p>
                                    <input type='radio'
                                           name='gender'
                                           value='other'
                                           checked={state.gender === 'other'}
                                    />
                                    <p className='gender-icon'>{t<string>(`Other`)}</p>
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input className={'form-control-input form-control-input-validator'}
                                           type={'password'}
                                           autoComplete={'off'}
                                           name={'password'}
                                           placeholder={t<string>(`Password`)}
                                           required={true} value={state.password}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.password}/>
                                </div>
                                {
                                    !stateValidator.password ?
                                        <span className='password-info'>
                                            {t<string>(`Minimum eight characters, at least one letter and one number`)}
                                        </span>
                                        : null
                                }
                            </div>
                            <div className={'login-register-form-field'}>
                                <div className={'input-validator'}>
                                    <input className={'form-control-input form-control-input-validator'}
                                           type={'password'}
                                           autoComplete={'off'}
                                           name={'password2'}
                                           required={true}
                                           placeholder={t<string>(`Repeat Password`)}
                                           value={state.password2}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.password2}/>
                                </div>


                            </div>
                        </div>
                        <button disabled={!stateValidator.username &&
                            !stateValidator.username &&
                            !stateValidator.email &&
                            !stateValidator.password &&
                            !stateValidator.password2 &&
                            !stateValidator.gender
                        }
                                type={'submit'}
                                className={'login-register-form-button btn btn-primary'}>
                            {t<string>(`Register`)}
                        </button>
                    </form> : globalState.loginRegisterFormPopup === 'login' ?
                        <form className='login-register-form'
                              onSubmit={e => onLoginHandler(e)}
                        >
                            <div className="login-register-form-fields">
                                <div className="login-register-form-field">
                                    <p>{t<string>(`Username`)}</p>
                                    <div className={'input-validator'}>
                                        <input className={'form-control-input form-control-input-validator'}
                                               name={'username'}
                                               value={state.username}
                                               onChange={e => onChangeHandler(e)}
                                        />
                                        <ValidInput valid={stateValidator.username}/>
                                    </div>



                                </div>
                                <div className="login-register-form-field">
                                    <p>{t<string>(`Password`)}</p>
                                    <div className={'input-validator'}>
                                        <input className={'form-control-input password'}
                                            // ref={passwordRef}
                                               name={'password'}
                                               value={state.password}
                                               type={showPassword ? 'text' : 'password'}
                                               onChange={e => onChangeHandler(e)}
                                        />
                                        <span className={'show-password-wrapper inputs-action'}
                                              onClick={() => setShowPassword(!showPassword)}
                                              onTouchStart={() => setShowPassword(!showPassword)}>
                                        <FontAwesomeIcon icon={faEye} style={{width: 20, height: 20}}/>
                                    </span>
                                    </div>

                                </div>
                            </div>
                            <button disabled={!stateValidator.username && !state.password}
                                    type={'submit'}
                                    className={'login-register-form-button btn btn-primary'}>
                                {t<string>(`Login`)}
                            </button>
                        </form> : null
                }

                <span onClick={() => {
                    globalState.loginRegisterFormPopup === 'register' ?
                        dispatch(loginRegisterForm('login')) :
                        dispatch(loginRegisterForm('register'))
                    onrResetStateHandler()
                }}
                      className='btn btn-secondary'>
                      {globalState.loginRegisterFormPopup === 'register' ?
                          t<string>(`Do You Have An Account? Login Here`) :
                          t<string>(`Not A Member Yet? Register Here`)}
                </span>

            </LoginRegisterPopupFormsStyledDiv>
        </Draggable>
    );
};
export default LoginRegisterPopupForms;


// color: ${(props: { response: ResponseTypes }) => props.response.type === 'success' ?
//         'green' :
//         props.response.type === 'error' ? 'red' : 'var(--main-text-color)'};