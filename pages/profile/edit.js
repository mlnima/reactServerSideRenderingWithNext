import React, {useEffect, useState} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {withTranslation} from "next-i18next";
import styled from "styled-components";

const EditProfileStyledMain = styled.main`
  grid-area: main;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
    .reset-password{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      width: 300px;
      border: var(--default-border) ;
      box-sizing: border-box;
      input{
        width: 95%;
      }
      p{
        width: 95%;
       // align-self: flex-start;
      }
    }
`

const edit = ({t}) => {
    const [changePasswordData, setChangePasswordData] = useState({
        username: '',
        password: '',
        newPassword: '',
        repeatNewPassword: '',
    })

    const onChangePasswordInputsHandler = (e) => {
        setChangePasswordData({
            ...changePasswordData,
            [e.target.name]: e.target.value
        })
    }




    return (
        <EditProfileStyledMain className='main'>
            <h1>{t(`profile:Edit Profile`)}</h1>
            <form className='reset-password'>
                <h2>{t(`profile:Change Password`)}</h2>
                <p>{t([`common:Username`])}</p>
                <input type="text" name={'username'} value={changePasswordData.username} onChange={e=>onChangePasswordInputsHandler(e)} />
                <p>{t([`common:Password`])}</p>
                <input type="text" name={'password'} value={changePasswordData.password} onChange={e=>onChangePasswordInputsHandler(e)} />
                <p>{t(`profile:New Password`)}</p>
                <input type="text" name={'newPassword'} value={changePasswordData.newPassword} onChange={e=>onChangePasswordInputsHandler(e)} />
                <p>{t(`profile:Repeat New Password`)}</p>
                <input type="text" name={'repeatNewPassword'} value={changePasswordData.repeatNewPassword} onChange={e=>onChangePasswordInputsHandler(e)} />
            </form>

        </EditProfileStyledMain>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], 'profilePage');

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'profile'])),
            ...firstLoadData,
            query: context.query
        }
    }
}
export default withTranslation(['common','customTranslation', 'profile'])(edit);