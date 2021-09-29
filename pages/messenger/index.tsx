import React, {useEffect, useState} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getConversations} from "../../_variables/_userSocialAjaxVariables";
import MessengerConversationsList from "../../components/includes/messengerPageComponents/MessengerConversationsList/MessengerConversationsList";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../../store/store";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {useSelector} from "react-redux";

import styled from "styled-components";
const MessengerPageStyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  .messenger-page-register-page-link{
    color: var(--main-text-color);
  }
`
const messengerPage = ( props:ClientPagesTypes) => {
    // @ts-ignore
    const userData = useSelector(state => state.user.userData)

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (userData?._id) {
            getConversations(userData?._id).then(res => {
                if (res.data.conversations) {
                    // @ts-ignore
                    setConversations([...conversations, ...res.data.conversations])
                }
            }).catch(err => {
                console.log(err)
            })
        }

    }, [userData]);


    if (userData._id){
        return (
            <div className='messenger-page main'>
                <MessengerConversationsList conversations={conversations} setConversations={setConversations}/>
            </div>
        );
    }else return (
        <MessengerPageStyledMain className='messenger-page main'>

           <Link href={'/register'}>
               <a className='messenger-page-register-page-link'>You need to create an account in order to access this page</a>
           </Link>
        </MessengerPageStyledMain>
    )

};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    const firstLoadData = await getFirstLoadData(context.req, ['homePageLeftSidebar', 'homePageRightSidebar', 'home'], store)

    return {props: {
            ...(await serverSideTranslations(context.locale  as string, ['common','customTranslation'])),
            ...firstLoadData,
    }}
})

export default messengerPage;
