import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import getMultipleSetting from "../../_variables/adminAjaxVariables/adminAjaxSettingsVariables/getMultipleSetting";
import {setSettings} from "@store/clientActions/settingsActions";
import {getCustomPages} from "@store/adminActions/adminPanelGlobalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {useRouter} from "next/router";
import {adminGetWidgets} from "@store/adminActions/adminWidgetsActions";
import Head from 'next/head'

const AdminDataSetterStyledSpan = styled.span`
  display: none;
`

const AdminDataSetter = () => {
    const dispatch = useDispatch()
    const {pathname} = useRouter()
    const userData = useSelector((store: StoreTypes) => store?.user?.userData)

    useEffect(() => {
        if (userData?.role === 'administrator') {
            getAndSetDataForAdmin().then(() => {
                console.log('welcome Admin, latest uncached data are sent for you')
            })
        }
    }, [userData, pathname]);

    const getAndSetDataForAdmin = async () => {
        try {
            const settingsData = await getMultipleSetting({settings: ['identity', 'design', 'adminSettings']}, localStorage.wt)

            dispatch(adminGetWidgets())
            dispatch(getCustomPages())

            if (settingsData?.data) {
                // @ts-ignore
                const identityData = settingsData.data.settings ? settingsData.data.settings.find((setting: any) => setting.type === 'identity') : {}
                // @ts-ignore
                const designData = settingsData.data.settings ? settingsData.data.settings.find((setting: any) => setting.type === 'design') : {}
                dispatch(setSettings({
                    design: designData.data,
                    identity: identityData.data,
                }))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Head>
                <meta name="theme-color" content="#000000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap"
                      rel="stylesheet"/>
                <meta charSet="utf-8"/>
            </Head>
        </>
    );
};
export default AdminDataSetter;
