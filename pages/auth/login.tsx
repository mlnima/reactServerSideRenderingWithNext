import React, {useEffect} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch} from "react-redux";
import {getDefaultPageData } from "@store_toolkit/clientActions/globalStateActions";

import {wrapper} from "@store_toolkit/store";
import type { ReactElement } from 'react';
import AppLayout from "@components/layouts/AppLayout";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";

const Login = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loginRegisterForm('login'))
    }, []);
    return null
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {


    await getDefaultPageData(
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