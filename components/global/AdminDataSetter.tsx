import React, {FC, useEffect} from 'react';
import {useRouter} from "next/router";
import Head from 'next/head'
import {adminPanelGetSettings} from "@store_toolkit/adminReducers/adminPanelSettingsReducer";
import {fetchCustomPages} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";
import {fetchAdminPanelGetWidgets} from "@store_toolkit/adminReducers/adminWidgetsReducer";
import {fetchAdminGetWidgets} from "@store_toolkit/clientReducers/widgetsReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

interface AdminDataSetterPropTypes {
    userRole: string
}

const AdminDataSetter: FC<AdminDataSetterPropTypes> = ({userRole}) => {
    const dispatch = useAppDispatch()
    const {pathname} = useRouter()

    useEffect(() => {
        if (userRole === 'administrator') {
            getAndSetDataForAdmin().finally()
        }
    }, [userRole, pathname]);

    const getAndSetDataForAdmin = async () => {
        try {
            if (pathname.includes('/admin')) {
                dispatch(fetchAdminPanelGetWidgets(null))
            } else {
                dispatch(fetchAdminGetWidgets(null))
            }
            dispatch(fetchCustomPages(null));
            dispatch(adminPanelGetSettings(null));
        } catch (err) {
            console.log(err)
        }
    }

    if (pathname?.match(/\/admin/g)) {
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
    } else return null

};
export default AdminDataSetter;
