import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import getMultipleSetting from "../../_variables/adminAjaxVariables/adminAjaxSettingsVariables/getMultipleSetting";
import {setSettings} from "@store/clientActions/settingsActions";
import {getCustomPages} from "@store/adminActions/adminPanelGlobalStateActions";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";
import {useRouter} from "next/router";
import {adminGetWidgets} from "@store/adminActions/adminWidgetsActions";

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
        <AdminDataSetterStyledSpan/>
    );
};
export default AdminDataSetter;
