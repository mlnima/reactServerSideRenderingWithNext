import React, { useState,useRef } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import withRouter from "next/dist/client/with-router";
import axios from 'axios'

const Register = props => {
    const messageLabel = useRef(null);
    const [ state, setState ] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        password2: undefined
    });
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
        e.preventDefault()
        axios.post('/api/v1/users/register',state).then(res=>{
            if (type === 'success'){
                messageLabel.current.style.backgroundColor = 'green'
            }else {
                messageLabel.current.style.backgroundColor = 'red'
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
            <div className='Register authPage'>
                <form className='authForm' onSubmit={e=>onSubmitHandler(e)}>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <div className="authFormItem">
                        <p>email</p>
                        <input name='email' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <div className="authFormItem">
                        <p>repeat password</p>
                        <input name='password2' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <button type='submit' className='submitBtn'>Register</button>
                </form>
            </div>
        </AppLayout>
    );
};
export default withRouter(Register);