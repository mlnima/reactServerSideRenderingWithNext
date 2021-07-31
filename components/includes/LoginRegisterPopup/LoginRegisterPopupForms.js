import React, {useState, useContext} from 'react';
import {AppContext} from "../../../context/AppContext";
import {login, registerUser} from "../../../_variables/ajaxAuthVariables";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LoginRegisterPopupForms = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        username:'',
        email:'',
        password:'',
        password2:'',
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

    const onresetStateHandler  = ()=>{
        setState({
            username:'',
            email:'',
            password:'',
            password2:'',
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
//  --custom-green :#44d62c;
    return (
        <React.Fragment>
            <style jsx>{`
            .server-response {
            color: ${response.type === 'success' ? 'green' : response.type === 'error' ? 'red' : 'var(--main-text-color)'} ;
            }
            
            .login-register-form{
            flex-direction: column;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--navigation-background-color);
            height: 300px;
            width: 280px;
            padding: 5px;
            border-radius: 10px;
            }
            .login-register-form-fields{
            width: 90%;
            }
            .login-register-form-field{
            
            }
            .login-register-form-field>input{
            border-radius: 5px;
            outline: none;
            border: none;
            padding: 3px ;
            height: 25px;
            width: 100%;
            font-size: 1rem;
            
            }
            .login-register-form-field>p{
            margin: 4px 0;
            color: var(--main-text-color);
            width: 100%;
            }
            .register-form-buttons{
            display: flex;
            justify-content: space-evenly;
            width: 100%;
            }
            
            .login-register-form-button{
            border: none;
            background-color: var(--custom-green);
            padding: 10px ;
            width: 100px;
            margin: 10px;
            text-align: center;
            font-size: 1rem;
            font-weight: bold;
            }
            
            .login-register-switch-form-button{
            border: none;
            background-color: var(--main-text-color);
            color: var(--navigation-background-color);
            padding: 5px ;
            width: 100px;
            margin: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            font-weight: bold; 
            }
            
            .close-form-button{
            align-self: flex-end;
            }
            
            `}</style>
            <p className='server-response'> {response.message}</p>
            <form className='login-register-form' onSubmit={
                contextData.state.loginRegisterFormPopupType === 'register' ?
                    e => onRegisterHandler(e) :
                    e => onLoginHandler(e)
            }>
                <span onClick={onCloseHandler} className='close-form-button'>
                    <FontAwesomeIcon style={{width: '20px', height: '20px', color: 'var(--navigation-text-color)'}} icon={faTimes}/>
                </span>
                {
                    contextData.state.loginRegisterFormPopupType === 'register' ?
                        <React.Fragment>
                            <div className="login-register-form-fields">
                                <div className="login-register-form-field">
                                    <p>username</p>
                                    <input name='username' value={state.username} onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>email</p>
                                    <input name='email' value={state.email} type='email' onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>password</p>
                                    <input name='password' value={state.password} type='password' onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>repeat password</p>
                                    <input name='password2' value={state.password2} type='password' onChange={e => onChangeHandler(e)}/>
                                </div>
                            </div>
                            <div className='register-form-buttons'>
                                <span value={null} onClick={()=> {
                                    onresetStateHandler()
                                    props.onTypeChangeHandler()
                                }} className='login-register-switch-form-button simple-button'>Login</span>

                                <button type='submit' className='login-register-form-button simple-button'>Register</button>
                            </div>
                        </React.Fragment> :
                        <React.Fragment>

                            <div className="login-register-form-fields">
                                <div className="login-register-form-field">
                                    <p>username</p>
                                    <input name='username' value={state.username} onChange={e => onChangeHandler(e)}/>
                                </div>
                                <div className="login-register-form-field">
                                    <p>password</p>
                                    <input name='password' value={state.password} type='password' onChange={e => onChangeHandler(e)}/>
                                </div>
                            </div>

                            <div className='register-form-buttons'>
                                <button type='submit' className='login-register-form-button simple-button'>Login</button>
                                <span onClick={()=>{
                                    onresetStateHandler()
                                    props.onTypeChangeHandler()
                                }} className='login-register-switch-form-button simple-button'>Register</span>
                            </div>


                        </React.Fragment>
                }
            </form>

        </React.Fragment>
    );
};
export default LoginRegisterPopupForms;
