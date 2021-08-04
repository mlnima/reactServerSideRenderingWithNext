import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import assets from '../assets'
import { getUserData, updateUserData, newAPIKey } from '../../../_variables/ajaxAuthVariables'
import { getAbsolutePath } from '../../../_variables/_variables'
import { AppContext } from '../../../context/AppContext'
import withRouter from 'next/dist/client/with-router'
import { resetPassword } from '../../../_variables/ajaxAuthVariables'
import styled from "styled-components";
let StyledDiv = styled.div`
   .user-admin-edit-profile-page-section{
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 300px;
    input,textarea{
      border: 1px solid rgba(0,0,0,.1);
      padding: 3px 5px;
      background-color: white;
    }
    textarea{
      min-height: 200px;
    }
  }
  .user-admin-edit-profile-page-section-reset-password{
    display: flex;
    flex-direction: column;
    justify-content: center;

    max-width: 300px;
    input{
      border: 1px solid rgba(0,0,0,.1);
      padding: 3px 5px;
      background-color: $light100;
    }
    button{
      border: 1px solid rgba(0,0,0,.1);
      padding: 3px 5px;
    }
  }
  .user-admin-edit-profile-page-section-API{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const user = props => {
    const contextData = useContext(AppContext);
    const [ userData, setUserData ] = useState({});

    const [ resetPasswordData, setResetPasswordData ] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
    })

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
        resetPassword(resetPasswordData.oldPassword, resetPasswordData.newPassword1, resetPasswordData.newPassword2)
    }

    const onNewAPIKeyRequest = () => {
        newAPIKey(window.location.origin).then(res => {

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
        updateUserData(userData, window.location.origin).then(() => {
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        }).catch(err => {
            console.log(err )
            contextData.dispatchState({
                ...contextData.state,
                loading: false
            })
        })
    }

    useEffect(() => {
        if (props.router){
            getUserData(props.router.query.id, window.location.origin).then(res=>{

                setUserData({ ...userData, ...res.data.user })
            })
        }
    }, [ props ]);

    return (

            <StyledDiv className='user-admin-edit-profile-page'>
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
                    <select value={ userData.role } name='role' onChange={ e => onChangeHandler(e) } disabled={ userData.keyMaster }>
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
            </StyledDiv>

    );
};

export default withRouter(user);
