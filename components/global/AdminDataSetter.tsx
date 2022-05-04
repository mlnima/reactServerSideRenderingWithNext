import React, {FC, useEffect} from 'react';
import {useDispatch, } from "react-redux";
import {getCustomPages} from "@store/adminActions/adminPanelGlobalStateActions";
import {useRouter} from "next/router";
import {adminGetWidgets} from "@store/adminActions/adminWidgetsActions";
import Head from 'next/head'
import {adminPanelGetSettings} from "@store/adminActions/adminPanelSettingsActions";

interface AdminDataSetterPropTypes{
    userRole:string
}

const AdminDataSetter:FC<AdminDataSetterPropTypes> = ({userRole}) => {
    const dispatch = useDispatch()
    const {pathname} = useRouter()

    useEffect(() => {
        if (userRole === 'administrator') {
            getAndSetDataForAdmin().finally()
        }
    }, [userRole, pathname]);

    const getAndSetDataForAdmin = async () => {
        try {
            dispatch(adminGetWidgets())
            dispatch(getCustomPages())
            dispatch(adminPanelGetSettings())
        } catch (err) {
            console.log(err)
        }
    }

    if (pathname?.match( /\/admin/g )){
        return (

            <Head>
                <title>Admin</title>
                <meta name="theme-color" content="#000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap"
                      rel="stylesheet"/>
                <meta charSet="utf-8"/>
                <link
                    rel={'stylesheet'}
                    type={'text/css'}
                    data-name={'vs/editor/editor.main'}
                    href={'https://cdn.jsdelivr.net/npm/monaco-editor@0.25.2/min/vs/editor/editor.main.css'}
                />
            </Head>

        );
    }else return null

};
export default AdminDataSetter;
