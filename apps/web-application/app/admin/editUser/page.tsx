'use client';
import React, { useEffect, useRef, useState } from 'react';

import { userStatus, userRoles } from '@repo/data-structures';
import { convertVariableNameToName } from '@repo/utils';
import { useAppDispatch } from '@store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles.scss';
import { User } from '@repo/typescript-types';
import dashboardGenerateNewApiKey from '@lib/actions/database/operations/users/dashboardGenerateNewApiKey';
import { ServerActionResponse } from '@lib/actions/response';
import dashboardGetUser from '@lib/actions/database/operations/users/dashboardGetUser';
import { setAlert } from '@store/reducers/globalStateReducer';
import dashboardDeleteUser from '@lib/actions/database/operations/users/dashboardDeleteUser';
import dashboardChangeUserPassword from '@lib/actions/database/operations/users/dashboardChangeUserPassword';
import dashboardUpdateUser from '@lib/actions/database/operations/users/dashboardUpdateUser';


const EditUserPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const [userData, setUserData] = useState<User | null>(null);
  const APIKeyElement = useRef(null);
  const [resetPasswordData, setResetPasswordData] = useState({ oldPassword: '', newPassword1: '', newPassword2: '' });

  // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch(editUserDataAction({ [e.target.name]: e.target.value }));
  // };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    if (!userData) return;
    // @ts-expect-error: it's fine
    setUserData((prevState) => (
      {
        ...(prevState || {}),
        [e.target.name]: e.target.value,
      }
    ));
  };

  const onPasswordDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPasswordData({
      ...resetPasswordData,
      [e.target.name]: e.target.value,
    });
  };

  const onPasswordResetHandler = async () => {
    const id = searchParams.get('id');
    if (!id) return;
    const { success, message } = await dashboardChangeUserPassword({
      _id: id,
      oldPass: resetPasswordData.oldPassword,
      newPass: resetPasswordData.newPassword1,
      newPass2: resetPasswordData.newPassword2,
    });

    if (!success) {
      dispatch(setAlert({ message, type: 'error', active: true }));
      return;
    }
  };

  const onNewAPIKeyRequest = async () => {

    const { data, success } = await dashboardGenerateNewApiKey() as ServerActionResponse<{
      API_KEY: string,
      uuid: string
    } | null>;

    if (!success) {
      dispatch(setAlert({ message: 'Something Went Wrong', type: 'error', active: true }));
      return;
    }

    // @ts-expect-error: it's fine
    setUserData((prevState) => (
      {
        ...(prevState || {}),
        ...data,
      }
    ));
  };

  const onDeleteUserHandler = async () => {
    try {
      const id = searchParams.get('id');
      if (!id) return;
      const { success } = await dashboardDeleteUser({ _id: id });

      if (success) {
        router.push('/admin/assets?assetsType=users');
      }
    } catch (error) {
      dispatch(setAlert({ message: 'Something Went Wrong', type: 'error', active: true }));
    }
  };

  // useEffect(() => {
  //   const id = searchParams.get('id');
  //   if (id) {
  //     setUserId(id);
  //     dispatch(getUserDataAction(id));
  //   }
  // }, [searchParams]);


  const getUserData = async (_id: string) => {
    try {
      const { success, data, message } = await dashboardGetUser({ _id }) as ServerActionResponse<{
        user: User,
      } | null>;


      if (!success || !data || !data?.user) {
        dispatch(setAlert({ message, type: 'error', active: true }));
        return;
      }

      const { user } = data;

      setUserData((prevState) => (
        {
          ...(prevState || {}),
          ...user,
        }
      ));

    } catch (error) {
      console.log(`error=> `, error);
    }
  };

  const onUpdateUserHandler = async ()=>{
    const {success, message }= await dashboardUpdateUser({ update: userData })

    dispatch(setAlert({ message, type: success ? 'success' : 'error', active: true }));
  }

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      getUserData(id);
    }
  }, [searchParams]);

  return (
    <div className="EditUserPage">
      <div className="user-admin-edit-profile-page-section">
        <p>Username :</p>
        <input className={'primaryInput'} name="username" value={userData?.username} onChange={e => onChangeHandler(e)}
               disabled={userData?.username === 'admin' || userData?.username === 'dashboard'} />
      </div>
      <div className="user-admin-edit-profile-page-section">
        <p>Email :</p>
        <input className={'primaryInput'} name="email" value={userData?.email} onChange={e => onChangeHandler(e)} />
      </div>
      <div className="user-admin-edit-profile-page-section">
        <p>First Name :</p>
        <input className={'primaryInput'} name="firstName" value={userData?.firstName}
               onChange={e => onChangeHandler(e)} />
      </div>
      <div className="user-admin-edit-profile-page-section">
        <p>Last Name :</p>
        <input className={'primaryInput'} name="lastName" value={userData?.lastName}
               onChange={e => onChangeHandler(e)} />
      </div>
      <div className="user-admin-edit-profile-page-section">
        <p>Nick Name :</p>
        <input className={'primaryInput'} name="nickName" value={userData?.nickName}
               onChange={e => onChangeHandler(e)} />
      </div>
      <div className="user-admin-edit-profile-page-section">
        <p>About :</p>
        <textarea className={'primaryInput'} name="about" value={userData?.about} onChange={e => onChangeHandler(e)} />
      </div>
      {/*<div className='user-admin-edit-profile-page-section'>*/}
      {/*  <p>Profile Image: </p>*/}
      {/*  <input className={'primaryInput'} name='profileImage' value={userData.profileImage.filePath}*/}
      {/*         onChange={e => onChangeHandler(e)}/>*/}
      {/*</div>*/}
      <div className="user-admin-edit-profile-page-section">
        <p>Role :</p>
        <select className={'primarySelect'} value={userData?.role} name="role" onChange={e => onChangeHandler(e)}
                disabled={userData?.keyMaster}>
          {userRoles.map((userRole: string, index: number) => {
            return <option value={userRole} key={index}>{convertVariableNameToName(userRole)}</option>;
          })}
        </select>
      </div>
      <div className="user-admin-edit-profile-page-section">
        <p>Status :</p>
        <select className={'primarySelect'} value={userData?.status} name="status" onChange={e => onChangeHandler(e)}
                disabled={userData?.keyMaster}>
          {userStatus.map((status: string, index: number) => {
            return <option value={status} key={index}>{convertVariableNameToName(status)}</option>;
          })}
        </select>
      </div>
      <button className="btn btn-primary" onClick={onUpdateUserHandler}>Save Changes
      </button>
      <div className="user-admin-edit-profile-page-section-reset-password">
        <h2>Reset Password:</h2>
        <p>Old Password:</p>
        <input className={'primaryInput'} name="oldPassword" value={resetPasswordData.oldPassword}
               onChange={e => onPasswordDataChangeHandler(e)} />
        <p>New Password:</p>
        <input className={'primaryInput'} name="newPassword1" value={resetPasswordData.newPassword1}
               onChange={e => onPasswordDataChangeHandler(e)} />
        <p>Repeat New Password:</p>
        <input className={'primaryInput'} name="newPassword2" value={resetPasswordData.newPassword2}
               onChange={e => onPasswordDataChangeHandler(e)} />
        <button className="saveBtn btn btn-primary" onClick={onPasswordResetHandler}>Reset The Password</button>
      </div>
      <div className="user-admin-edit-profile-page-section-API">
        <h2>API KEY</h2>
        <label ref={APIKeyElement}>{userData?.API_KEY}</label>
        <button className="btn btn-primary" onClick={onNewAPIKeyRequest}>Generate API Key</button>
      </div>
      {!userData?.keyMaster ? (
        <div className="user-admin-edit-profile-page-delete-user">
          <h2>Delete User</h2>
          <button className="delete-user-button" onClick={onDeleteUserHandler}>Delete User</button>
        </div>
      ) : null}
    </div>
  );
};

export default EditUserPage;