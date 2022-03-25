import React, {useEffect} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch} from "react-redux";
import {getDefaultPageData, setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";
import {wrapper} from "@store/store";

const Login = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoginRegisterFormStatus('login'))
    }, []);
    return null
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(context, [],
        {
            setHeadData:true,
            page:'login'
        }
    ))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})


export default Login;