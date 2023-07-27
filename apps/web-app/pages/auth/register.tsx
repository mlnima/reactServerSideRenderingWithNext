import React, {useEffect} from 'react';
import {wrapper} from "@store_toolkit/store";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";

const Register = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loginRegisterForm('register'))
    }, []);
    return <HeadSetter/>
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData: true,
            page: 'register'
        },
        store
    )

    return {
        props: {}
    }
})

export default Register;