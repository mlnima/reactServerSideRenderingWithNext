import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {userStatus, userRoles} from "@repo/data-structures";
import {convertVariableNameToName} from "@repo/shared-util";
import {DashboardStore, Store} from "@repo/typescript-types";
import {useAppDispatch} from "@store/hooks";
import {useParams, useSearchParams} from "react-router-dom";
import {
    changePasswordAction,
    deleteUserAction, editUserDataAction,
    generateNewAPIKeyAction,
    getUserDataAction, updateUserDataAction
} from "@store/reducers/usersReducer";

const UserStyledDiv = styled.div`
  .user-admin-edit-profile-page-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    margin: auto;

    input, textarea, select {
      max-width: 300px;
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
    margin: auto;
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

const User = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useSearchParams()
    const [userId, setUserId] = useState('')
    const userData = useSelector(({users}: DashboardStore) => users?.user)
    const APIKeyElement = useRef(null)

    const [resetPasswordData, setResetPasswordData] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
    })

    const onChangeHandler =
        (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(editUserDataAction({[e.target.name]: e.target.value}))
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
            changePasswordAction({
                oldPass: resetPasswordData.oldPassword,
                newPass: resetPasswordData.newPassword1,
                newPass2: resetPasswordData.newPassword2
            })
        )
    }

    const onNewAPIKeyRequest = () => {
        dispatch(generateNewAPIKeyAction())
        dispatch(getUserDataAction(userId))
    }


    const onDeleteUserHandler = () => {
        dispatch(deleteUserAction(userId))
    }

    useEffect(() => {
        const id = search.get('id')

        if (id) {
            setUserId(id)
            dispatch(getUserDataAction(id))
        }


    }, []);

    return (

        <UserStyledDiv className='user-admin-edit-profile-page'>
            <div className='user-admin-edit-profile-page-section'>
                <p>Username :</p>
                <input className={'primaryInput'} name='username' value={userData?.username}
                       onChange={e => onChangeHandler(e)}
                       disabled={userData?.username === 'admin' || userData?.username === 'dashboard'}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Email :</p>
                <input className={'primaryInput'} name='email' value={userData?.email}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>First Name :</p>
                <input className={'primaryInput'} name='firstName' value={userData?.firstName}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Last Name :</p>
                <input className={'primaryInput'} name='lastName' value={userData?.lastName}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Nick Name :</p>
                <input className={'primaryInput'} name='nickName' value={userData?.nickName}
                       onChange={e => onChangeHandler(e)}/>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>About :</p>
                <textarea className={'primaryInput'} name='about' value={userData?.about}
                          onChange={e => onChangeHandler(e)}/>
            </div>
            {/*<div className='user-admin-edit-profile-page-section'>*/}
            {/*    <p>Profile Image: </p>*/}
            {/*    <input className={'primaryInput'} name='profileImage' value={userData.profileImage.filePath}*/}
            {/*           onChange={e => onChangeHandler(e)}/>*/}
            {/*</div>*/}
            <div className='user-admin-edit-profile-page-section'>
                <p>Role :</p>
                <select className={'primarySelect'} value={userData?.role}
                        name='role'
                        onChange={e => onChangeHandler(e)}
                        disabled={userData?.keyMaster}>
                    {userRoles.map((userRole: string, index: number) => {
                        return <option value={userRole} key={index}>{convertVariableNameToName(userRole)}</option>
                    })}
                </select>
            </div>
            <div className='user-admin-edit-profile-page-section'>
                <p>Status :</p>
                <select className={'primarySelect'} value={userData?.status}
                        name='status'
                        onChange={e => onChangeHandler(e)}
                        disabled={userData?.keyMaster}>
                    {userStatus.map((status: string, index: number) => {
                        return <option value={status} key={index}>{convertVariableNameToName(status)}</option>
                    })}
                </select>
            </div>
            <button className='btn btn-primary' onClick={() => dispatch(updateUserDataAction(userData))}>
                Save Changes
            </button>
            <div className='user-admin-edit-profile-page-section-reset-password'>
                <h2>Reset Password:</h2>
                <p>Old Password:</p>
                <input className={'primaryInput'} name='oldPassword' value={resetPasswordData?.oldPassword}
                       onChange={e => onPasswordDataChangeHandler(e)}/>
                <p>New Password:</p>
                <input className={'primaryInput'} name='newPassword1' value={resetPasswordData?.newPassword1}
                       onChange={e => onPasswordDataChangeHandler(e)}/>
                <p>Repeat New Password:</p>
                <input className={'primaryInput'} name='newPassword2' value={resetPasswordData?.newPassword2}
                       onChange={e => onPasswordDataChangeHandler(e)}/>
                <button className='saveBtn btn btn-primary' onClick={onPasswordResetHandler}>Reset The Password</button>
            </div>
            <div className='user-admin-edit-profile-page-section-API'>
                <h2>API KEY</h2>
                <label ref={APIKeyElement}>{userData?.API_KEY}</label>
                <button className='btn btn-primary' onClick={onNewAPIKeyRequest}>Generate API Key</button>
            </div>
            {
                !userData?.keyMaster ?
                    <div className='user-admin-edit-profile-page-delete-user'>
                        <h2>Delete User</h2>
                        <button className='delete-user-button' onClick={onDeleteUserHandler}>Delete User</button>
                    </div> :
                    null
            }

        </UserStyledDiv>

    );
};

export default User;
