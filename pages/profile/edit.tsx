import React, {useEffect, useState} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withTranslation} from "next-i18next";
import styled from "styled-components";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";
import {PrimaryButton} from '../../components/global/Styles/Buttons'
import {useSelector, useDispatch} from "react-redux";
import {userResetPassword} from "../../store/actions/userActions";
import _passwordValidator from "../../_variables/clientVariables/_passwordValidator";
import ValidInput from "../../components/includes/LoginRegisterPopup/ValidInput";
import {FormInput,FormInputWithValidator} from '../../components/global/Styles/Inputs'

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
    border: var(--default-border);
    box-sizing: border-box;



    .reset-password-form-field:last-of-type {
      margin-bottom: 20px;
    }


    .reset-password-form-field{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
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

const edit = (props: ClientPagesTypes) => {
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
            newPassword: changePasswordData.newPassword ? _passwordValidator(changePasswordData.newPassword) :false,
            repeatNewPassword: changePasswordData.repeatNewPassword ? changePasswordData.newPassword === changePasswordData.repeatNewPassword :false,
        })
    }, [changePasswordData]);

    return (
        <EditProfileStyledMain className='main'>
            <h1>{props.t(`profile:Edit Profile`)}</h1>
            <form className='reset-password-form' onSubmit={onSubmitHandler}>
                <h2>{props.t(`profile:Change Password`)}</h2>

                <div className='reset-password-form-field'>
                    <p>{props.t([`common:Password`])}</p>
                    <FormInput type="password" autoComplete="off" name={'password'} value={changePasswordData.password} onChange={e => onChangePasswordInputsHandler(e)}/>

                </div>


                <div className='reset-password-form-field'>
                    <p>{props.t(`profile:New Password`)}</p>
                    {
                        !changePasswordDataValidator.newPassword ?
                            <span className='password-info'>{props.t(`common:Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character like $`)}</span> :
                            null
                    }
                    <FormInputWithValidator type="password" autoComplete="off" name={'newPassword'} value={changePasswordData.newPassword} onChange={e => onChangePasswordInputsHandler(e)}/>
                    <ValidInput valid={changePasswordDataValidator.newPassword}/>
                </div>


                <div className='reset-password-form-field'>
                    <p>{props.t(`profile:Repeat New Password`)}</p>
                    <FormInputWithValidator type="password" autoComplete="off" name={'repeatNewPassword'} value={changePasswordData.repeatNewPassword} onChange={e => onChangePasswordInputsHandler(e)}/>
                    <ValidInput valid={changePasswordDataValidator.repeatNewPassword}/>
                </div>

                <PrimaryButton type='submit'>Change Password</PrimaryButton>
            </form>

        </EditProfileStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], store);

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation', 'profile'])),
            ...firstLoadData,
            query: context.query
        }
    }
})

export default withTranslation(['common', 'customTranslation', 'profile'])(edit);
//export default edit;