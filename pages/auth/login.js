import React, { useState,useRef } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import './registerLogin.scss';
import axios from 'axios'

const Login = props => {
    const messageLabel = useRef(null);
    const [ state, setState ] = useState({});
    const [ data, setData ] = useState({
        response:undefined,
        type:undefined,
    });

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('/api/v1/users/login',state).then(res=>{
            let type = res.data.type;
            if (type === 'success'){
                if (res.data.token){
                    localStorage.setItem('wt',res.data.token)
                }
            }else {

            }

            setData({
                ...data,
                response:res.data.response,
                type:res.data.type,
            })

        }).catch(err=>console.log( err))
    };



    return (
        <AppLayout>
            <div className='Login authPage'>
                <form className='authForm' onSubmit={e=>onSubmitHandler(e)}>
                    <label className='messageLabel'>{data.response}</label>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' type='password' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <button className='submitBtn' type='submit' >Login</button>
                </form>
            </div>
        </AppLayout>
    );
};
export default Login;