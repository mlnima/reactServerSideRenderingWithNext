import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import assets from '../assets'
import { getUserData, updateUserData, newAPIKey } from '../../../_variables/ajaxAuthVariables'
import { getAbsolutePath } from '../../../_variables/_variables'
import { AppContext } from '../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'

const user = props => {
    const contextData = useContext(AppContext);
    const [ userData, setUserData ] = useState({});

    const [ resetPasswordData, setResetPasswordData ] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
    })

    useEffect(() => {
        setUserData({ ...userData, ...props.user })
    }, [ props ]);

    useEffect(() => {
        console.log(props)
    }, [ props ]);

    const onChangeHandler = e => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onPasswordDataChangeHandler = e => {
        setResetPasswordData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onPasswordResetHandler = () => {

    }

    const onNewAPIKeyRequest = () => {
        newAPIKey(window.location.origin).then(res => {
            console.log(res.data)
            setUserData({
                ...userData,
                ...res.data.updatedData
            })
        })
    }

    const onSaveHandler = () => {
        contextData.dispatchState({
            ...contextData.state,
            loading: true
        })
        updateUserData(userData, window.location.origin).then(res => {
            console.log(res)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }).catch(err => {
            console.log(err)
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }

    return (
        <AdminLayout>
            <div className='user-admin-edit-profile-page'>
                <div className='user-admin-edit-profile-page-section'>
                    <p>Username :</p>
                    <input name='username' value={ userData.username } onChange={ e => onChangeHandler(e) } disabled={ userData.username === 'admin' || userData.username === 'Admin' }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>Email :</p>
                    <input name='email' value={ userData.email } onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>First Name :</p>
                    <input name='firstName' value={ userData.firstName } onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>Last Name :</p>
                    <input name='lastName' value={ userData.lastName } onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>Nick Name :</p>
                    <input name='nickName' value={ userData.nickName } onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>About :</p>
                    <textarea name='about' value={ userData.about } onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>Profile Image :</p>
                    <input name='profileImage' value={ userData.profileImage } onChange={ e => onChangeHandler(e) }/>
                </div>
                <div className='user-admin-edit-profile-page-section'>
                    <p>Role :</p>
                    <select value={ userData.role } onChange={ e => onChangeHandler(e) } disabled={ userData.role === 'administrator' }>
                        <option value='administrator'>Administrator</option>
                        <option value='author'>Author</option>
                        <option value='editor'>Editor</option>
                        <option value='subscriber'>Subscriber</option>
                    </select>
                </div>
                <button className='saveBtn' onClick={ () => onSaveHandler() }>Save Changes</button>
                <div className='user-admin-edit-profile-page-section-reset-password'>
                    <h2>Reset Password:</h2>
                    <p>Old Password:</p>
                    <input name='oldPassword' value={ resetPasswordData.oldPassword } onChange={ e => onPasswordDataChangeHandler(e) }/>
                    <p>New Password:</p>
                    <input name='newPassword1' value={ resetPasswordData.newPassword1 } onChange={ e => onPasswordDataChangeHandler(e) }/>
                    <p>Repeat New Password:</p>
                    <input name='newPassword2' value={ resetPasswordData.newPassword2 } onChange={ e => onPasswordDataChangeHandler(e) }/>
                    <button className='saveBtn' onClick={ () => onPasswordResetHandler() }>Reset The Password</button>
                </div>
                <div className='user-admin-edit-profile-page-section-API'>
                    <h2>API KEY</h2>
                    <label>{ userData.API_KEY }</label>
                    <button className='saveBtn' onClick={ () => onNewAPIKeyRequest() }>Generate API Key</button>
                </div>
            </div>
        </AdminLayout>
    );
};

user.getInitialProps = async ({ req, query }) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let user;

    const userData = await getUserData(query.id, domainName)
    user = userData.data.user
    return { query, user }
}

export default withRouter(user);
