import React, {useEffect, useRef, useState} from 'react';
import {getUserData, updateUserData, newAPIKey} from '../../../_variables/ajaxAuthVariables'
import {resetPassword} from '../../../_variables/ajaxAuthVariables'
import {useRouter} from "next/router";
import deleteUser from "../../../_variables/adminAjaxVariables/adminAjaxUsersVariables/deleteUser";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/clientActions/globalStateActions";
import styled from "styled-components";
import {wrapper} from "../../../store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const UserStyledDiv = styled.div`
  .user-admin-edit-profile-page-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 300px;

    input, textarea {
      border: 1px solid rgba(0, 0, 0, .1);
      padding: 3px 5px;
      background-color: white;
    }

    textarea {
      min-height: 200px;
    }
  }

  .user-admin-edit-profile-page-section-reset-password {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;

    input {
      border: 1px solid rgba(0, 0, 0, .1);
      padding: 3px 5px;
      background-color: white;
    }

    button {
      border: 1px solid rgba(0, 0, 0, .1);
      padding: 3px 5px;
    }
  }

  .user-admin-edit-profile-page-section-API {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button{
      margin: 20px;
    }
  }

  .user-admin-edit-profile-page-delete-user {
    .delete-user-button {
      background-color: red;
      border: none;
      padding: 10px 20px;
    }
  }
`
const user = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const APIKeyElement = useRef(null)

    const [userData, setUserData] = useState({
        username: '',
        status: '',
        keyMaster: '',
        API_KEY: '',
        profileImage: '',
        email: '',
        firstName: '',
        lastName: '',
        nickName: '',
        about: '',
        role: '',
        _id: '',

    });

    const [resetPasswordData, setResetPasswordData] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
    })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onPasswordDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setResetPasswordData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onPasswordResetHandler = () => {

        resetPassword(resetPasswordData.oldPassword, resetPasswordData.newPassword1, resetPasswordData.newPassword2)
    }

    const onNewAPIKeyRequest = () => {
        // @ts-ignore
        newAPIKey(process.env.NEXT_PUBLIC_PRODUCTION_URL).then(res => {

            setUserData({
                ...userData,
                // @ts-ignore
                ...res.data.updatedData
            })
        })
    }

    const onSaveHandler = () => {
        dispatch(setLoading(true))
        updateUserData(userData).then(() => {
            dispatch(setLoading(false))
        }).catch(err => {
            console.log(err)
            dispatch(setLoading(false))
        })
    }

    const onDeleteUserHandler = () => {
        deleteUser(userData._id).then(() => router.back())
    }

    useEffect(() => {
        if (router.query.id) {
            getUserData(router.query.id).then(res => {
                // @ts-ignore
                setUserData({...userData, ...res.data.user})
            })
        }
    }, []);

    // @ts-ignore
    return (

        <UserStyledDiv className='user-admin-edit-profile-page'>
            <div className='user-admin-edit-profile-page-section'>
                <p>Username :</p>
                <input name='username' value={userData.username} onChange={e => onChangeHandler(e)} disabled={userData.username === 'admin' || userData.username === 'Admin'}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Email :</p>
                <input name='email' value={userData.email} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>First Name :</p>
                <input name='firstName' value={userData.firstName} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Last Name :</p>
                <input name='lastName' value={userData.lastName} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Nick Name :</p>
                <input name='nickName' value={userData.nickName} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>About :</p>
                <textarea name='about' value={userData.about} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Profile Image :</p>
                <input name='profileImage' value={userData.profileImage} onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Role :</p>
                <select value={userData.role}
                        name='role'
                        onChange={e => onChangeHandler(e)}
                       // @ts-ignore
                        disabled={userData.keyMaster}>
                    <option value='administrator'>Administrator</option>
                    <option value='author'>Author</option>
                    <option value='editor'>Editor</option>
                    <option value='subscriber'>Subscriber</option>
                </select>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Status :</p>
                <select value={userData.status}
                        name='status'
                        onChange={e => onChangeHandler(e)}
                    // @ts-ignore
                        disabled={userData.keyMaster}>
                    <option value='unverified'>unverified</option>
                    <option value='verified'>verified</option>
                    <option value='restricted'>restricted</option>
                    <option value='suspended'>suspended</option>
                </select>
            </div>
            <button className='saveBtn greenActionBtn' onClick={() => onSaveHandler()}>Save Changes</button>
            <div className='user-admin-edit-profile-page-section-reset-password'>
                <h2>Reset Password:</h2>
                <p>Old Password:</p>
                <input name='oldPassword' value={resetPasswordData.oldPassword} onChange={e => onPasswordDataChangeHandler(e)}/>
                <p>New Password:</p>
                <input name='newPassword1' value={resetPasswordData.newPassword1} onChange={e => onPasswordDataChangeHandler(e)}/>
                <p>Repeat New Password:</p>
                <input name='newPassword2' value={resetPasswordData.newPassword2} onChange={e => onPasswordDataChangeHandler(e)}/>
                <button className='saveBtn greenActionBtn' onClick={onPasswordResetHandler}>Reset The Password</button>
            </div>
            <div className='user-admin-edit-profile-page-section-API'>
                <h2>API KEY</h2>
                <label ref={APIKeyElement}>{userData.API_KEY}</label>
                <button className='btn btn-primary' onClick={onNewAPIKeyRequest}>Generate API Key</button>
            </div>
            {
                !userData.keyMaster ?
                    <div className='user-admin-edit-profile-page-delete-user'>
                        <h2>Delete User</h2>
                        <button className='delete-user-button' onClick={onDeleteUserHandler}>Delete User</button>
                    </div> :
                    null
            }

        </UserStyledDiv>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default user;
