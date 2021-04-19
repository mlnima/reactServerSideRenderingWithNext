import React, {useState, useRef, useContext, useEffect} from 'react';
import withRouter from 'next/dist/client/with-router'
import axios from 'axios'
import {AppContext} from "../../context/AppContext";
import {getFirstLoadData, getMultipleSetting, getMultipleWidgetWithData} from '../../_variables/ajaxVariables'
import {login} from "../../_variables/ajaxAuthVariables";
import {useRouter} from "next/router";

const Login = () => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({});
    const [data, setData] = useState({
        response: undefined,
        type: undefined,
    });

    const onChangeHandler = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        login(state).then(res=>{
            if (res.data?.type === 'success') {
                if (res.data?.token) {
                    localStorage.setItem('wt', res.data.token)
                }
            }
        }).then(()=>{
            contextData.functions.getAndSetUserInfo().then(() => {
                router.back()
            })
        })
    };


    return (

            <div className='Login authPage main'>
                <form className='authForm' onSubmit={e => onSubmitHandler(e)}>
                    <label className='messageLabel'>{data.response}</label>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <button className='submitBtn' type='submit'>Login</button>
                </form>
            </div>

    );
};

export const getServerSideProps = async ({req}) => {
    const firstLoadData = await getFirstLoadData(req,[])
    return {props: {widgets:firstLoadData.widgets,...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile),  referer:firstLoadData.referer}}
}


export default withRouter(Login);