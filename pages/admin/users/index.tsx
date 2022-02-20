import React, {useEffect, useState} from 'react';
import {adminGetUsers} from "../../../store/adminActions/adminUserActions";
import {wrapper} from "@store/store";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch} from "react-redux";


const users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(adminGetUsers())
    }, []);

    return (

        <div>

        </div>

    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common'])),
        }
    }
})
export default users;