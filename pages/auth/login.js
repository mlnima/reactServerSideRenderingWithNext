import React, { useState, useRef, useContext, useEffect } from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import withRouter from 'next/dist/client/with-router'
import axios from 'axios'
import { AppContext } from "../../context/AppContext";
import { getAbsolutePath } from '../../_variables/_variables'
import { getMultipleSetting, getMultipleWidgetWithData } from '../../_variables/ajaxVariables'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter'
import dataDecoder from '../../server/tools/dataDecoder'

const Login = props => {
    const contextData = useContext(AppContext);
    const messageLabel = useRef(null);
    const [ state, setState ] = useState({});
    const [ data, setData ] = useState({
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
        axios.post('/api/v1/users/login', state).then(res => {
            let type = res.data.type;
            if (type === 'success') {
                if (res.data.token) {
                    localStorage.setItem('wt', res.data.token)
                }
            } else {

            }
            setData({
                ...data,
                response: res.data.response,
                type: res.data.type,
            })

        }).then(() => {
            contextData.functions.getAndSetUserInfo().then(()=>{
                props.router.back()
            })
            // contextData.functions.goToHomePage()
        }).catch(err => console.log(err))
    };

    return (
        <AppLayout>
            <SiteSettingSetter { ...props }/>
            <div className='Login authPage'>
                <form className='authForm' onSubmit={ e => onSubmitHandler(e) }>
                    <label className='messageLabel'>{ data.response }</label>
                    <div className="authFormItem">
                        <p>username</p>
                        <input name='username' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <div className="authFormItem">
                        <p>password</p>
                        <input name='password' type='password' onChange={ e => onChangeHandler(e) }/>
                    </div>
                    <button className='submitBtn' type='submit'>Login</button>
                </form>
            </div>
        </AppLayout>
    );
};
Login.getInitialProps = async ({ req }) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let settings;
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, domainName, true)
    let widgets;
    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'header','topBar','footer','navigation' ] }, domainName, true)
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    return { ...settings,widgets }
}
export default withRouter(Login);