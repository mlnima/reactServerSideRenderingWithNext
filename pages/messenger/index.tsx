import MessengerConversationsList from "../../components/includes/messengerPageComponents/MessengerConversationsList/MessengerConversationsList";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import { useSelector} from "react-redux";
import styled from "styled-components";
import {getDefaultPageData} from "@store_toolkit/clientActions/globalStateActions";
import MessengerLayout from "@components/layouts/MessengerLayout";
import type {ReactElement} from 'react';

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

    const userData = useSelector((state : StoreTypes) => state.user.userData)

    if (userData?._id) {
        return (
            <div className='messenger-page main'>
                <MessengerConversationsList/>
            </div>
        );
    } else return (
        <MessengerPageStyledMain className='messenger-page main'>
            <Link href={'/register'}>
                <a className='messenger-page-register-page-link'>You need to create an account in order to access this page</a>
            </Link>
        </MessengerPageStyledMain>
    )

};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await getDefaultPageData(
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

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation','profile'])),
        }
    }
})

messengerPage.getLayout = function getLayout(page: ReactElement) {

    return (
        <MessengerLayout>
            {page}
        </MessengerLayout>
    )
}

export default messengerPage;
