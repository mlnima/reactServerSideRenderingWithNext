import React, {useEffect} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store_toolkit/store";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";

const Login = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loginRegisterForm('login'))
    }, []);
    return null
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    await _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData:true,
            page:'login'
        },
        store
    )

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

Login.getLayout = function getLayout(page:ReactElement) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default Login;