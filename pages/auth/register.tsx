import React, {useEffect} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {wrapper} from "../../store/store";
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "../../store/clientActions/globalStateActions";

const Register = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoginRegisterFormStatus('register'))
    }, []);
    return null
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
    // @ts-ignore
    async (context ) => {
    const firstLoadData = await getFirstLoadData(
        context.req,
        ['register'],
        store,
        context.locale
    )
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common','customTranslation'])),
            ...firstLoadData,
        }
    }
})

export default Register;