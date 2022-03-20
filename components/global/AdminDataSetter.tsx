import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import getMultipleSetting from "../../_variables/adminAjaxVariables/adminAjaxSettingsVariables/getMultipleSetting";
import {setSettings} from "@store/clientActions/settingsActions";
import {getCustomPages} from "@store/adminActions/adminPanelGlobalStateActions";
// import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {useRouter} from "next/router";
import {adminGetWidgets} from "@store/adminActions/adminWidgetsActions";
import Head from 'next/head'

const AdminDataSetterStyledSpan = styled.span`
  display: none;
`
interface AdminDataSetterPropTypes{
    userRole:string
}

const AdminDataSetter:FC<AdminDataSetterPropTypes> = ({userRole}) => {
    const dispatch = useDispatch()
    const {pathname} = useRouter()
  //  const userRole = useSelector((store: StoreTypes) => store?.user?.userData?.role)
  //   const user = useSelector((store: StoreTypes) => store?.user)

    useEffect(() => {
        if (userRole === 'administrator') {
            getAndSetDataForAdmin().then(() => {
                console.log('welcome Admin, latest uncached data are sent for you')
            })
        }
    }, [userRole, pathname]);

    // useEffect(() => {
    //     console.log(user)
    // }, [user]);

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

            <Head>
                <title>Admin</title>
                <meta name="theme-color" content="#000000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600&amp;display=swap"
                      rel="stylesheet"/>
                <meta charSet="utf-8"/>
            </Head>

    );
};
export default AdminDataSetter;
