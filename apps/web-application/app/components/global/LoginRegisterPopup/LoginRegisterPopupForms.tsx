'use client';
import React, { useState, useEffect, FC, useRef } from 'react';
import ValidInput from './ValidInput';
import { loginAction } from '@store/reducers/userReducers/loginAction';
import { setAlert } from '@store/reducers/globalStateReducer';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import FormHeader from './FormHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { registerUserAction } from '@store/reducers/userReducers/registerUserAction';
import { usernameValidatorRegisterForm, passwordValidatorRegisterForm } from '@repo/shared-util';
import { emailValidator } from '@repo/shared-util';
import './LoginRegisterPopupForms.scss';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface StateTypes {
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
    gender?: string;
}

interface StateValidatorTypes {
    username?: boolean;
    email?: boolean;
    password?: boolean;
    password2?: boolean;
    gender?: boolean;
}

interface IProps {
    locale: string;
    dictionary: {
        [key: string]: string;
    };
}

const LoginRegisterPopupForms: FC<IProps> = ({ locale, dictionary }: IProps) => {
    const dispatch = useAppDispatch();
    const LoginRegisterPopupFormsRef = useRef(null);
    const globalState = useAppSelector(({ globalState }) => globalState);
    const { anyoneCanRegister } = useAppSelector(({ settings }) => settings?.initialSettings?.membershipSettings);
    const [state, setState] = useState<StateTypes>({
        username: '',
        email: '',
        password: '',
        password2: '',
        gender: '',
    });
    const [stateValidator, setStateValidator] = useState<StateValidatorTypes>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        } as { [key: string]: string });
    };

    const onLoginHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!!state.username && state.password) {
            dispatch(loginAction({ username: state.username, password: state.password }));
        }
    };

    const onRegisterHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const checkUsername = state.username
            ? state.username.length <= 16 && state?.username?.length >= 6 && /[a-zA-Z]/.test(state.username)
            : false;
        const checkPasswords = state.password === state.password2;

        if (!checkUsername) {
            dispatch(setAlert({ message: 'you can not use this username', type: 'error' }));
        }

        if (!checkPasswords) {
            dispatch(setAlert({ message: 'password is to short or is not match', type: 'error' }));
        }

        if (checkUsername && checkPasswords) {
            dispatch(registerUserAction({ data: state }));
        }
    };

    useEffect(() => {
        setStateValidator({
            username:
                globalState.loginRegisterFormPopup === 'register' ? usernameValidatorRegisterForm(state?.username) : !!state?.username,
            email: emailValidator(state.email),
            password: passwordValidatorRegisterForm(state.password),
            password2: state.password2 ? state.password === state.password2 : false,
            gender: state.gender ? state.gender === 'male' || state.gender === 'female' || state.gender === 'other' : false,
        });
    }, [state]);

    return (
        <div className="loginRegisterContent" ref={LoginRegisterPopupFormsRef}>
            <FormHeader locale={locale} dictionary={dictionary} />

            {
                globalState.loginRegisterFormPopup === 'register' && anyoneCanRegister ? (
                    <form className="login-register-form" onSubmit={e => onRegisterHandler(e)}>
                        <div className="login-register-form-fields">
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input
                                        className={'primaryInput form-control-input-validator'}
                                        required={true}
                                        name="username"
                                        value={state.username}
                                        placeholder={dictionary?.['Username'] || 'Username'}
                                        onChange={e => onChangeHandler(e)}
                                    />
                                    <div className={'filedInfo'}>
                                        <ValidInput valid={stateValidator.username} />
                                    </div>
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input
                                        className={'primaryInput form-control-input-validator'}
                                        required={true}
                                        name="email"
                                        value={state.email}
                                        autoComplete={'off'}
                                        type="email"
                                        placeholder={dictionary['Email'] || 'Email'}
                                        onChange={e => onChangeHandler(e)}
                                    />
                                    <div className={'filedInfo'}>
                                        <ValidInput valid={stateValidator.email} />
                                    </div>
                                </div>
                            </div>
                            <div className="login-register-form-field gender">
                                <label> {dictionary['Gender'] || 'Gender'}:</label>
                                <select
                                    className={'primarySelect'}
                                    onChange={e => onChangeHandler(e)}
                                    name={'gender'}
                                    autoComplete={'off'}
                                    value={state.gender}
                                    required={true}
                                >
                                    <option value="">{dictionary['Select'] || 'Select'}</option>
                                    <option value="female">{dictionary['Female'] || 'Female'}</option>
                                    <option value="male">{dictionary['Male'] || 'Male'}</option>
                                    <option value="other">{dictionary['Other'] || 'Other'}</option>
                                </select>
                                <div className={'filedInfo'}>
                                    <ValidInput valid={!!state.gender} />
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input
                                        className={'primaryInput form-control-input-validator'}
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete={'off'}
                                        name={'password'}
                                        placeholder={dictionary['Password'] || 'Password'}
                                        required={true}
                                        value={state.password}
                                        onChange={e => onChangeHandler(e)}
                                    />
                                    <div className={'filedInfo'}>
                                        <span
                                            className={'showPasswordButton'}
                                            onClick={() => setShowPassword(!showPassword)}
                                            onTouchStart={() => setShowPassword(!showPassword)}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ width: 20, height: 20 }} />
                                        </span>
                                        <ValidInput valid={stateValidator.password} />
                                    </div>
                                </div>
                                {!stateValidator.password ? (
                                    <span className="password-info">
                                        {dictionary['Minimum eight characters, at least one letter and one number'] ||
                                            'Minimum eight characters, at least one letter and one number'}
                                    </span>
                                ) : null}
                            </div>
                            <div className={'login-register-form-field'}>
                                <div className={'input-validator'}>
                                    <input
                                        className={'primaryInput form-control-input-validator'}
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete={'off'}
                                        name={'password2'}
                                        required={true}
                                        placeholder={dictionary['Repeat Password'] || 'Repeat Password'}
                                        value={state.password2}
                                        onChange={e => onChangeHandler(e)}
                                    />
                                    <div className={'filedInfo'}>
                                        <ValidInput valid={stateValidator.password2} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            disabled={
                                !stateValidator.username &&
                                !stateValidator.username &&
                                !stateValidator.email &&
                                !stateValidator.password &&
                                !stateValidator.password2 &&
                                !stateValidator.gender
                            }
                            type={'submit'}
                            className={'login-register-form-button btn btn-primary'}
                        >
                            {dictionary['Register'] || 'Register'}
                        </button>
                    </form>
                ) : globalState.loginRegisterFormPopup === 'login' ? (
                    <form className="login-register-form" onSubmit={e => onLoginHandler(e)}>
                        <div className="login-register-form-fields">
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input
                                        className={'primaryInput form-control-input-validator'}
                                        name={'username'}
                                        value={state.username}
                                        placeholder={dictionary['Username'] || 'Username'}
                                        onChange={e => onChangeHandler(e)}
                                    />
                                </div>
                            </div>
                            <div className="login-register-form-field">
                                <div className={'input-validator'}>
                                    <input
                                        className={'primaryInput password'}
                                        // ref={passwordRef}
                                        name={'password'}
                                        placeholder={dictionary['Password'] || 'Password'}
                                        value={state.password}
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={e => onChangeHandler(e)}
                                    />
                                    <div className={'filedInfo'}>
                                        <span
                                            className={'showPasswordButton showPasswordButtonLogin'}
                                            onClick={() => setShowPassword(!showPassword)}
                                            onTouchStart={() => setShowPassword(!showPassword)}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ width: 20, height: 20 }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            disabled={!stateValidator.username && !state.password}
                            type={'submit'}
                            className={'btn btn-primary login-register-form-button btn btn-primary'}
                        >
                            {dictionary['Login'] || 'Login'}
                        </button>
                    </form>
                ) : null
            }
        </div>
    );
};
export default LoginRegisterPopupForms;
