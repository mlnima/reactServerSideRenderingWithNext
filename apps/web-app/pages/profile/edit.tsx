import React, {useEffect, useState} from 'react';
import useTranslation from 'next-translate/useTranslation'
import styled from "styled-components";
import {wrapper} from "@store_toolkit/store";
import {fetchUserResetPassword} from "@store_toolkit/clientReducers/userReducer";
import _passwordValidator from "@_variables/_clientVariables/clientVariables/_passwordValidator";
import ValidInput from "../../components/includes/LoginRegisterPopup/ValidInput";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";

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
    const {t} = useTranslation();
    const dispatch = useAppDispatch()

    const user = useAppSelector(({user}:Store)=>user)

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
        if (!user.loggedIn){
            dispatch(loginRegisterForm('login'))
        }else{
            //@ts-ignore
            dispatch(fetchUserResetPassword(changePasswordData))
        }
    }

    useEffect(() => {

        setChangePasswordDataValidator({
            newPassword: changePasswordData.newPassword ? _passwordValidator(changePasswordData.newPassword) : false,
            repeatNewPassword: changePasswordData.repeatNewPassword ? changePasswordData.newPassword === changePasswordData.repeatNewPassword : false,
        })
    }, [changePasswordData]);

    return (
        <EditProfileStyledMain className='main'>
            <h1> {t('profile:Edit Profile', {},{fallback:'Edit Profile'})}</h1>
            <form className='reset-password-form' onSubmit={onSubmitHandler}>

                <h2>{t('profile:Change Password', {},{fallback:'Change Password'})}</h2>
                <div className='reset-password-form-field'>

                    <p>{t('common:Password', {},{fallback:'Password'})}</p>
                    <input className={'form-control-input'}
                           type="password"
                           autoComplete="off"
                           name={'password'}
                           value={changePasswordData.password}
                           onChange={e => onChangePasswordInputsHandler(e)}
                    />

                </div>

                <div className='reset-password-form-field'>
                    <p>{t('profile:New Password', {},{fallback:'New Password'})}</p>
                    {
                        !changePasswordDataValidator.newPassword ?
                            <span className='password-info'>
                              {t('common:Minimum eight characters, at least one letter and one number',
                                  {},
                                  {fallback:'Minimum eight characters, at least one letter and one number'})}
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
                    <p>{t('profile:Repeat New Password', {},{fallback:'Repeat New Password'})}</p>
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
                    {t('profile:Change Password', {},{fallback:'Change Password'})}
                </button>
            </form>

        </EditProfileStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ],
        {
            setHeadData: true,
            page: 'home'
        },
        store
    )

    return null
})


export default edit;
