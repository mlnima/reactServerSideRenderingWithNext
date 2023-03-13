import MessengerConversationsList from "../../components/includes/messengerPageComponents/MessengerConversationsList/MessengerConversationsList";
import Link from "next/link";
import {wrapper} from "@store_toolkit/store";
import { useSelector} from "react-redux";
import styled from "styled-components";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import React from "react";

const MessengerPageStyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 100%;

  .messenger-page-register-page-link {
    color: var(--main-text-color);
  }
`
const messengerPage = () => {

    const userData = useSelector((state : Store) => state.user.userData)

    if (userData?._id) {
        return (
            <div className='messenger-page main'>
                <HeadSetter title={'Messenger'}/>
                <MessengerConversationsList/>
            </div>
        );
    } else return (
        <MessengerPageStyledMain id={'content'} className='messenger-page main'>
            <HeadSetter title={'Messenger'}/>
            <Link href={'/register'} className='messenger-page-register-page-link'>
                You need to create an account in order to access this page
            </Link>
        </MessengerPageStyledMain>
    )

};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'messengerPagePageLeftSidebar',
            'messengerPageRightSidebar',
            'messengerPage',
        ],
        {
            setHeadData:true,
            page:'messenger'
        },
        store
    )

    return null
})

export default messengerPage;
