import React, {useState, useRef, useContext} from 'react';
import withRouter from "next/dist/client/with-router";
import axios from 'axios'
import {getAbsolutePath} from '../../_variables/_variables'
import {getFirstLoadData, getMultipleSetting, getMultipleWidgetWithData} from '../../_variables/ajaxVariables'
import dataDecoder from '../../server/tools/dataDecoder'
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";

const Register = props => {
    const contextData = useContext(AppContext);
    const messageLabel = useRef(null);
    const router = useRouter()
    const [state, setState] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        password2: undefined
    });
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
        e.preventDefault()
        axios.post('/api/v1/users/register', state).then(res => {
            if (type === 'success') {
                messageLabel.current.style.backgroundColor = 'green'
            } else {
                messageLabel.current.style.backgroundColor = 'red'
            }

            setData({
                ...data,
                response: res.data.response,
                type: res.data.type,
            })
        }).catch(err => console.log(err))
    };

    if (contextData.siteIdentity.anyoneCanRegister) {
        return (
            <div className='Register authPage main'>
                <form className='authForm' onSubmit={e => onSubmitHandler(e)}>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>email</p>
                        <input name='email' type='email' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <div className="authFormItem">
                        <p>repeat password</p>
                        <input name='password2' type='password' onChange={e => onChangeHandler(e)}/>
                    </div>
                    <button type='submit' className='submitBtn'>Register</button>
                </form>
            </div>

        );

    } else {
        return (
            <div className='Register authPage'/>
        )
    }
};

export const getServerSideProps = async ({req}) => {
    const firstLoadData = await getFirstLoadData(req,[])
    return {props: {widgets: firstLoadData.widgets, ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer}}
}


export default withRouter(Register);