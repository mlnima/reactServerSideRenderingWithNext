import React, {useEffect} from 'react';
import {wrapper} from "@store_toolkit/store";
import {loginRegisterForm} from "@store_toolkit/clientReducers/globalStateReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";

const Register = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loginRegisterForm('register'))
    }, []);
    return null
};

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    await _getServerSideStaticPageData(
        context,
        [],
        {
            setHeadData:true,
            page:'register'
        },
        store
    )

    return null
})

export default Register;