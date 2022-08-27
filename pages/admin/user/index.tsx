import React,{useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import type {ReactElement} from 'react';
import AdminLayout from "@components/layouts/AdminLayout";
import userRoles from "@_dataStructures/userRoles";
import userStatus from "@_dataStructures/userStatus";
import {
    fetchAdminPanelNewAPIKey,
    fetchAdminPanelUserData,
    adminPanelEditUserData,
    fetchAdminPanelUpdateUserData, fetchAdminPanelDeleteUser, fetchAdminPanelChangePassword
} from "@store_toolkit/adminReducers/adminPanelUsersReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import convertVariableNameToName from "@_variables/util/convertVariableNameToName";

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

    button {
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
    const dispatch = useAdminDispatch()
    const router = useRouter()
    const userData = useSelector(({adminPanelUsers}: StoreTypes) => adminPanelUsers.user)
    const APIKeyElement = useRef(null)

    const [resetPasswordData, setResetPasswordData] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
    })

    const onChangeHandler =
        (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(adminPanelEditUserData({[e.target.name]: e.target.value}))
    }

    const onPasswordDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setResetPasswordData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const onPasswordResetHandler = () => {
        dispatch(
            fetchAdminPanelChangePassword({
                    oldPass:resetPasswordData.oldPassword,
                    newPass: resetPasswordData.newPassword1,
                    newPass2: resetPasswordData.newPassword2
                })
        )
    }

    const onNewAPIKeyRequest = () => {
        dispatch(fetchAdminPanelNewAPIKey(null))
        dispatch(fetchAdminPanelUserData(router.query.id as string))
    }

    const onDeleteUserHandler = () => {
        dispatch(fetchAdminPanelDeleteUser({id:userData._id, router}))
    }

    useEffect(() => {
        if (router.query.id) dispatch(fetchAdminPanelUserData(router.query.id as string))
    }, []);

    return (

        <UserStyledDiv className='user-admin-edit-profile-page'>
            <div className='user-admin-edit-profile-page-section'>
                <p>Username :</p>
                <input name='username' value={userData.username} onChange={e => onChangeHandler(e)}
                       disabled={userData.username === 'admin' || userData.username === 'Admin'}/>
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
                        disabled={userData.keyMaster}>
                    {userRoles.map((userRole:string,index:number)=>{
                        return <option value={userRole} key={index}>{convertVariableNameToName(userRole)}</option>
                    })}
                </select>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Status :</p>
                <select value={userData.status}
                        name='status'
                        onChange={e => onChangeHandler(e)}
                        disabled={userData.keyMaster}>
                    {userStatus.map((status:string,index:number)=>{
                        return <option value={status} key={index}>{convertVariableNameToName(status)}</option>
                    })}
                </select>
            </div>
            <button className='btn btn-primary' onClick={() => dispatch(fetchAdminPanelUpdateUserData(userData))}>
                Save Changes
            </button>
            <div className='user-admin-edit-profile-page-section-reset-password'>
                <h2>Reset Password:</h2>
                <p>Old Password:</p>
                <input name='oldPassword' value={resetPasswordData.oldPassword}
                       onChange={e => onPasswordDataChangeHandler(e)}/>
                <p>New Password:</p>
                <input name='newPassword1' value={resetPasswordData.newPassword1}
                       onChange={e => onPasswordDataChangeHandler(e)}/>
                <p>Repeat New Password:</p>
                <input name='newPassword2' value={resetPasswordData.newPassword2}
                       onChange={e => onPasswordDataChangeHandler(e)}/>
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


user.getLayout = function getLayout(page: ReactElement) {

    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}
export default user;
