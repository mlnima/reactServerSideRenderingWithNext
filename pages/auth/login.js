import React, { useState } from 'react';
import Router from "../../components/layouts/Router";
import './registerLogin.scss';
import axios from 'axios'

const Login = props => {
    const [ state, setState ] = useState({});

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = e => {
        e.preventDefault()
        axios.post('/api/v1/users/login',state)
    };
    return (
        <Router>
            <div className='Login authPage'>
                <form className='authForm' onSubmit={e=>onSubmitHandler(e)}>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <button className='submitBtn' type='submit' >Login</button>
                </form>
            </div>
        </Router>
    );
};
export default Login;