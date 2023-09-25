'use client';
import React, {useState, useEffect, FC} from 'react';
import {loginRegisterForm} from "@store/reducers/globalStateReducer";
import Draggable from 'react-draggable';
import ValidInput from "./ValidInput";
import {loginAction} from "@store/reducers/userReducers/loginAction";
import {setAlert} from "@store/reducers/globalStateReducer";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import FormHeader from "./FormHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {registerUserAction} from "@store/reducers/userReducers/registerUserAction";
import {usernameValidatorRegisterForm, passwordValidatorRegisterForm} from "custom-util";
import {emailValidator} from "custom-util";
import './LoginRegisterPopupForms.styles.scss'


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

interface IProps {
    locale: string,
    dictionary: {
        [key: string]: string
    }
}


const LoginRegisterPopupForms: FC<IProps> = ({locale,dictionary}: IProps) => {

    const dispatch = useAppDispatch()
    const globalState = useAppSelector(({globalState}) => globalState)

    const [state, setState] = useState<StateTypes>({
        username: '',
        email: '',
        password: '',
        password2: '',
    });
    const [stateValidator, setStateValidator] = useState<StateValidatorTypes>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

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

    const onLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!!state.username && state.password) {
            dispatch(loginAction({username: state.username, password: state.password}))
        }
    };


    const onRegisterHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const checkUsername = state.username ? state.username.length <= 16 && state?.username?.length >= 6 && (/[a-zA-Z]/).test(state.username) : false
        const checkPasswords = state.password === state.password2;

        if (!checkUsername) {
            dispatch(setAlert({message: 'you can not use this username', type: 'error'}))
        }

        if (!checkPasswords) {
            dispatch(setAlert({message: 'password is to short or is not match', type: 'error'}))
        }

        if (checkUsername && checkPasswords) {
            dispatch(registerUserAction({data: state}))
        }
    };


    useEffect(() => {
        setStateValidator({
            username: globalState.loginRegisterFormPopup === 'register' ?
                usernameValidatorRegisterForm(state?.username) :
                !!state?.username,
            email: emailValidator(state.email),
            password: passwordValidatorRegisterForm(state.password),
            password2: state.password2 ? state.password === state.password2 : false,
            gender: state.gender ? state.gender === 'male' || state.gender === 'female' || state.gender === 'other' : false,
        })
    }, [state]);

    return (
        <Draggable handle='.handle'>
            <div className='loginRegisterContent'>
                <FormHeader locale={locale} dictionary={dictionary}/>
                {globalState.loginRegisterFormPopup === 'register' ?
                    <form className='login-register-form' onSubmit={e => onRegisterHandler(e)}>
                        <div className="login-register-form-fields">
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input className={'primaryInput form-control-input-validator'}
                                           required={true}
                                           name='username'
                                           value={state.username}
                                           placeholder={dictionary?.['Username'] || 'Username'}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.username}/>
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input className={'primaryInput form-control-input-validator'}
                                           autoComplete="off"
                                           required={true}
                                           name='email'
                                           value={state.email}
                                           type='email'
                                           placeholder={dictionary['Email'] || 'Email'}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.email}/>
                                </div>
                            </div>
                            <div className="login-register-form-field gender">
                                <p> {dictionary['Gender'] || 'Gender'}:</p>
                                <div className='gender-options'
                                     onChange={e => onChangeHandler(e)}>
                                    <input type='radio'
                                           name='gender'
                                           value='male'
                                           checked={state.gender === 'male'}
                                    />
                                    <p className='gender-icon'>{dictionary['Male'] || 'Male'}</p>
                                    <input type='radio'
                                           name='gender'
                                           value='female'
                                           checked={state.gender === 'female'}
                                    />
                                    <p className='gender-icon'>{dictionary['Female'] || 'Female'}</p>
                                    <input type='radio'
                                           name='gender'
                                           value='other'
                                           checked={state.gender === 'other'}
                                    />
                                    <p className='gender-icon'>{dictionary['Other'] || 'Other'}</p>
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input className={'primaryInput form-control-input-validator'}
                                           type={'password'}
                                           autoComplete={'off'}
                                           name={'password'}
                                           placeholder={dictionary['Password'] || 'Password'}
                                           required={true} value={state.password}
                                           onChange={e => onChangeHandler(e)}
                                    />
                                    <ValidInput valid={stateValidator.password}/>
                                </div>
                                {
                                    !stateValidator.password ?
                                        <span className='password-info'>
                                            {dictionary['Minimum eight characters, at least one letter and one number'] ||
                                                'Minimum eight characters, at least one letter and one number'
                                            }
                                        </span>
                                        : null
                                }
                            </div>
                            <div className={'login-register-form-field'}>
                                <div className={'input-validator'}>
                                    <input className={'primaryInput form-control-input-validator'}
                                           type={'password'}
                                           autoComplete={'off'}
                                           name={'password2'}
                                           required={true}
                                           placeholder={dictionary['Repeat Password'] || 'Repeat Password'}
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
                            {dictionary['Register'] || 'Register'}
                        </button>
                    </form> : globalState.loginRegisterFormPopup === 'login' ?
                        <form className='login-register-form'
                              onSubmit={e => onLoginHandler(e)}
                        >
                            <div className="login-register-form-fields">
                                <div className="login-register-form-field">
                                    <p>{dictionary['Username'] || 'Username'}</p>
                                    <div className={'input-validator'}>
                                        <input className={'primaryInput form-control-input-validator'}
                                               name={'username'}
                                               value={state.username}
                                               onChange={e => onChangeHandler(e)}
                                        />
                                        <ValidInput valid={stateValidator.username}/>
                                    </div>


                                </div>
                                <div className="login-register-form-field">
                                    <p>{dictionary['Password'] || 'Password'}</p>
                                    <div className={'input-validator'}>
                                        <input className={'primaryInput password'}
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
                                {dictionary['Login'] || 'Login'}
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
                          dictionary['Do You Have An Account? Login Here'] || 'Do You Have An Account? Login Here' :
                          dictionary['Not A Member Yet? Register Here'] || 'Not A Member Yet? Register Here'}
                </span>

            </div>
        </Draggable>
    );
};
export default LoginRegisterPopupForms;


// color: ${(props: { response: ResponseTypes }) => props.response.type === 'success' ?
//         'green' :
//         props.response.type === 'error' ? 'red' : 'var(--primary-text-color,#fff)'};