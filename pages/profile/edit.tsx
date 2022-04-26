import React, {useEffect, useState} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from 'next-i18next';
import styled from "styled-components";
import {wrapper} from "@store/store";
import {useDispatch} from "react-redux";
import {userResetPassword} from "@store/clientActions/userActions";
import _passwordValidator from "../../_variables/clientVariables/_passwordValidator";
import ValidInput from "../../components/includes/LoginRegisterPopup/ValidInput";
import {getDefaultPageData} from "@store/clientActions/globalStateActions";
import type {ReactElement} from 'react';
import AppLayout from "@components/layouts/AppLayout";

const EditProfileStyledMain = styled.main`
  grid-area: main;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  .reset-password-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    width: 300px;
    box-sizing: border-box;

    .reset-password-form-field:last-of-type {
      margin-bottom: 20px;
    }

    .reset-password-form-field {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;

      .password-info {
        margin: 5px 0;
        font-size: x-small;
      }

      p {
        width: 100%;
      }
    }
  }
`

interface ChangePasswordDataValidator {
    newPassword?: boolean,
    repeatNewPassword?: boolean,
}

interface ChangePasswordData {
    password?: string,
    newPassword?: string,
    repeatNewPassword?: string,
}

const edit = () => {
    const {t} = useTranslation(['common', 'customTranslation', 'profile']);
    const dispatch = useDispatch()

    const [changePasswordData, setChangePasswordData] = useState<ChangePasswordData>({})
    const [changePasswordDataValidator, setChangePasswordDataValidator] = useState<ChangePasswordDataValidator>({})

    const onChangePasswordInputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChangePasswordData({
            ...changePasswordData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        dispatch(userResetPassword(changePasswordData))
    }

    useEffect(() => {

        setChangePasswordDataValidator({
            newPassword: changePasswordData.newPassword ? _passwordValidator(changePasswordData.newPassword) : false,
            repeatNewPassword: changePasswordData.repeatNewPassword ? changePasswordData.newPassword === changePasswordData.repeatNewPassword : false,
        })
    }, [changePasswordData]);

    return (
        <EditProfileStyledMain className='main'>
            <h1> {t<string>('Edit Profile', {ns: 'profile'})}</h1>
            <form className='reset-password-form' onSubmit={onSubmitHandler}>
                <h2>{t<string>('Change Password', {ns: 'profile'})}</h2>

                <div className='reset-password-form-field'>
                    <p>{t<string>('Password', {ns: 'common'})}</p>
                    <input className={'form-control-input'}
                           type="password"
                           autoComplete="off"
                           name={'password'}
                           value={changePasswordData.password}
                           onChange={e => onChangePasswordInputsHandler(e)}
                    />

                </div>

                <div className='reset-password-form-field'>
                    <p> {t<string>('NewPassword', {ns: 'profile'})}</p>
                    {
                        !changePasswordDataValidator.newPassword ?
                            <span className='password-info'>
                                {t<string>('Minimum eight characters, at least one letter and one number', {ns: 'common'})}
                            </span>
                            : null
                    }
                    <input className={'form-control-input form-control-input-validator'}
                           type="password"
                           autoComplete="off"
                           name={'newPassword'}
                           value={changePasswordData.newPassword}
                           onChange={e => onChangePasswordInputsHandler(e)}
                    />
                    <ValidInput valid={changePasswordDataValidator.newPassword}/>
                </div>

                <div className={'reset-password-form-field'}>
                    <p>{t<string>('Repeat New Password', {ns: 'profile'})}</p>
                    <input className={'form-control-input form-control-input-validator'}
                           type={'password'}
                           autoComplete="off"
                           name={'repeatNewPassword'}
                           value={changePasswordData.repeatNewPassword}
                           onChange={e => onChangePasswordInputsHandler(e)}
                    />
                    <ValidInput valid={changePasswordDataValidator.repeatNewPassword}/>
                </div>

                <button type='submit' className={'btn btn-warning'}>
                    {t<string>('Change Password', {ns: 'profile'})}
                </button>
            </form>

        </EditProfileStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profilePage'
        ]))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation', 'profile'])),
        }
    }
})

edit.getLayout = function getLayout(page: ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default edit;
//export default edit;