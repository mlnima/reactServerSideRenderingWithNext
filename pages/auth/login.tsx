import React, {useEffect} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import {login} from "../../_variables/ajaxAuthVariables";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch} from "react-redux";
import {setLoginRegisterFormStatus} from "../../store/clientActions/globalStateActions";
import {wrapper} from "../../store/store";

const Login = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoginRegisterFormStatus('login'))
    }, []);
    return null
};

export const getServerSideProps = wrapper.getServerSideProps(store =>
    // @ts-ignore
    async (context ) => {
    await getFirstLoadData(
        context.req,
        ['login'],
        store,
        context.locale
    )
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
        }
    }
})


export default Login;