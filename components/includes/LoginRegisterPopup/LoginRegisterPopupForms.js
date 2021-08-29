import React, {useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {login, registerUser} from "../../../_variables/ajaxAuthVariables";
import {faFemale, faMale, faTimes, faTransgender} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from "next-i18next";

const LoginRegisterPopupForms = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const [response, setResponse] = useState({
        message: undefined,
        type: undefined,
    });

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onresetStateHandler = () => {
        setState({
            username: '',
            email: '',
            password: '',
            password2: '',
        })
    }

    const onLoginHandler = e => {
        e.preventDefault();
        login(state).then(res => {
            localStorage.setItem('wt', res.data.token)
            setResponse({
                ...response,
                message: res.data.message,
                type: 'success',
            })
        }).then(() => {
            contextData.functions.getAndSetUserInfo()
        }).catch(err => {
            setResponse({
                ...response,
                message: err.response.data.message,
                type: 'error',
            })
        })
    };
    const onRegisterHandler = e => {
        e.preventDefault()
        const checkUsername = state.username.length < 15 && state.username.length > 8;
        const checkPasswords = state.password === state.password2;

        if (!checkUsername) {
            setResponse({
                message: 'you can not use this username',
                type: 'error',
            })
        }

        if (!checkPasswords) {
            setResponse({
                message: 'password is to short or is not match',
                type: 'error',
            })
        }


        if (checkUsername && checkPasswords)
            registerUser(state).then(res => {
                setResponse({
                    ...response,
                    message: res.data.message,
                    type: 'success',
                })
            }).catch(err => {
                setResponse({
                    ...response,
                    message: err.response.data.message,
                    type: 'error',
                })
                console.log(err.response)
            })

    };

    const onCloseHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loginRegisterFormPopup: false
        })
    }

    return (
        <React.Fragment>
            <style jsx>{`
              .server-response {
                color: ${response.type === 'success' ? 'green' : response.type === 'error' ? 'red' : 'var(--main-text-color)'};
              }

              .login-register-form {
                flex-direction: column;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: var(--navigation-background-color);
                //height: 300px;
                width: 280px;
                padding: 5px;
                border-radius: 10px;
              }

              .login-register-form-fields {
                width: 90%;
              }

              .login-register-form-field {

              }

              .gender {
                .gender-options {
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  .gender-icon {
                    color: var(--main-text-color);
                    padding: 0;
                    margin: 0 20px 0 0;
                  }
                }
              }

              .login-register-form-field > input {
                border-radius: 5px;
                outline: none;
                border: none;
                padding: 3px;
                height: 25px;
                width: 100%;
                font-size: 1rem;

              }

              .login-register-form-field > p {
                margin: 4px 0;
                color: var(--main-text-color);
                width: 100%;

              }

              .password-info {
                color: var(--main-text-color);
                text-align: center;
                font-size: 8px;
                width: 100%;
              }

              .register-form-buttons {
                display: flex;
                justify-content: space-evenly;
                width: 100%;
              }

              .login-register-form-button {
                border: none;
                background-color: var(--main-active-color);
                padding: 10px;
                width: 100px;
                margin: 10px;
                text-align: center;
                font-size: 1rem;
                font-weight: bold;
              }

              .login-register-switch-form-button {
                border: none;
                background-color: var(--main-text-color);
                color: var(--navigation-background-color);
                padding: 5px;
                width: 100px;
                margin: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1rem;
                font-weight: bold;
              }

              .close-form-button {
                align-self: flex-end;
              }

            `}</style>
            <p className='server-response'> {response.message}</p>
            <form className='login-register-form' onSubmit={
                contextData.state.loginRegisterFormPopupType === 'register' ?
                    e => onRegisterHandler(e) :
                    e => onLoginHandler(e)
            }>
                <span onClick={onCloseHandler} className='close-form-button' title={props.t(`common:Close`)}>
                    <FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color)'}} icon={faTimes}/>
                </span>
                {
                    contextData.state.loginRegisterFormPopupType === 'register' ?
                        <React.Fragment>
                            <div className="login-register-form-fields">
                                <div className="login-register-form-field">
                                    <p>{props.t(`common:Username`)}</p>
                                    <input minLength="8" maxLength="15" required={true} name='username' value={state.username} onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>{props.t(`common:Email`)}</p>
                                    <input minLength="8" required={true} name='email' value={state.email} type='email' onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field gender">
                                    <p>{props.t(`common:Gender`)}</p>
                                    <div className='gender-options' onChange={e => onChangeHandler(e)}>
                                        <input type='radio' name='gender' value='male' checked={state.gender === 'male'} onChange={e => {
                                        }}/>

                                        <p className='gender-icon'>{props.t(`common:Male`)}</p>
                                        <input type='radio' name='gender' value='female' checked={state.gender === 'female'} onChange={e => {
                                        }}/>
                                        <p className='gender-icon'>{props.t(`common:Female`)}</p>
                                        <input type='radio' name='gender' value='other' checked={state.gender === 'other'} onChange={e => {
                                        }}/>
                                        <p className='gender-icon'>{props.t(`common:Other`)}</p>
                                    </div>
                                </div>
                                <div className="login-register-form-field">
                                    <p>{props.t(`common:Password`)} </p>
                                    <span className='password-info'>{props.t(`common:Use 8 or more characters with a mix of letters, numbers & symbols`)}</span>
                                    <input name='password' required={true} value={state.password} type='password' onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>{props.t(`common:Repeat Password`)}</p>
                                    <input name='password2' required={true} value={state.password2} type='password' onChange={e => onChangeHandler(e)}/>
                                </div>
                            </div>
                            <div className='register-form-buttons'>
                                <span value={null} onClick={() => {
                                    onresetStateHandler()
                                    props.onTypeChangeHandler()
                                }} className='login-register-switch-form-button simple-button'>{props.t(`common:Login`)}</span>

                                <button type='submit' className='login-register-form-button simple-button'>{props.t(`common:Register`)}</button>
                            </div>
                        </React.Fragment> :
                        <React.Fragment>

                            <div className="login-register-form-fields">
                                <div className="login-register-form-field">
                                    <p>{props.t(`common:Username`)}</p>
                                    <input name='username' value={state.username} onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>{props.t(`common:Password`)}</p>
                                    <input name='password' value={state.password} type='password' onChange={e => onChangeHandler(e)}/>
                                </div>
                            </div>

                            <div className='register-form-buttons'>
                                <button type='submit' className='login-register-form-button simple-button'>{props.t(`common:Login`)}</button>
                                <span onClick={() => {
                                    onresetStateHandler()
                                    props.onTypeChangeHandler()
                                }} className='login-register-switch-form-button simple-button'>{props.t(`common:Register`)}</span>
                            </div>
                        </React.Fragment>
                }
            </form>

        </React.Fragment>
    );
};
export default withTranslation(['common'])(LoginRegisterPopupForms);
