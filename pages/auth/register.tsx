import React, {useEffect} from 'react';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "@store/store";
import {useDispatch} from "react-redux";
import {getDefaultPageData, setLoginRegisterFormStatus} from "@store/clientActions/globalStateActions";

const Register = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoginRegisterFormStatus('register'))
    }, []);
    return null
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await store.dispatch(getDefaultPageData(context, []))

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})

export default Register;