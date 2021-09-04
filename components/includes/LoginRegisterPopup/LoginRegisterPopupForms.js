import React, {useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {login, registerUser} from "../../../_variables/ajaxAuthVariables";
import {faFemale, faMale, faTimes, faTransgender} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from "next-i18next";

import styled from "styled-components";
const LoginRegisterPopupFormsStyledDiv = styled.div`
  background-color: var(--navigation-background-color);
  width: 100%;
  max-width:   320px;
  padding: 10px 5px;
  color: var(--navigation-text-color);
  position: relative;

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
  }
  .close-form-button {
    position: absolute;
    align-self: flex-end;
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    align-items: center;
    cursor: pointer;
    svg{
      margin: 5px 3px 0 3px;
      width: 16px;
      height: 16px;
    }
  }
  
  .login-register-title{
    text-align: center;
    margin: 0;
    
  }
  
  .server-response {
    color: ${
    props=> props.response.type === 'success' ?'green' : props.response.type === 'error' ? 'red' :'var(--main-text-color)'};
  }
  
  
  

  .login-register-form {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .login-register-form-fields {
      width: 95%;
      
      input{
        outline: none;
        border: none;
        padding: 0 7px;
        height: 25px;
        width: 95%;
        font-size: 14px;
      }
      
      p{
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
    }

    .login-register-form-button {
      border: none;
      background-color: var(--main-active-color);
      color: var(--navigation-background-color);
      font-weight: bold;
      font-size: 18px;
      padding: 10px 0 ;
      width: 95%;
      margin: 10px;
      text-align: center;
     
      
    }
  }

  @media only screen and (min-width: 768px) {

   
  }
  
`


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
        <LoginRegisterPopupFormsStyledDiv response={response} className='login-register-content'>
                <span onClick={onCloseHandler} className='close-form-button' title={props.t(`common:Close`)}>
                    {props.t(`common:Close`)}
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            <h3 className='login-register-title' >{contextData.state.loginRegisterFormPopupType === 'register' ? props.t(`common:Register`) : props.t(`common:Member login`) }</h3>
            {response.message ?  <p className='server-response'> {props.t(`common:${response.message}`)} </p> :null}

            {
                contextData.state.loginRegisterFormPopupType === 'register' ?
                    <form className='login-register-form' onSubmit={contextData.state.loginRegisterFormPopupType === 'register' ?e => onRegisterHandler(e) : e => onLoginHandler(e) }>

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
                        <button type='submit' className='login-register-form-button simple-button'>{props.t(`common:Register`)}</button>


                    </form>:
                    <form className='login-register-form' onSubmit={contextData.state.loginRegisterFormPopupType === 'register' ?e => onRegisterHandler(e) : e => onLoginHandler(e) }>

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
                        <button type='submit' className='login-register-form-button simple-button'>{props.t(`common:Login`)}</button>
                    </form>
            }

            <span  onClick={() => {
                onresetStateHandler()
                props.onTypeChangeHandler()
            }} className='login-register-switch-form-button simple-button'>{ contextData.state.loginRegisterFormPopupType === 'register' ?  props.t(`common:Do You Have An Account? Login Here`) :  props.t(`common:Not A Member Yet? Register Here`)}</span>

        </LoginRegisterPopupFormsStyledDiv>
    );
};
export default withTranslation(['common'])(LoginRegisterPopupForms);
