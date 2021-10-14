import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import getMultipleSetting from "../../_variables/adminAjaxVariables/adminAjaxSettingsVariables/getMultipleSetting";
import _getMultipleWidgets from "../../_variables/adminAjaxVariables/adminAjaxWidgetsVariables/_getMultipleWidgets";
import {setWidgetsForAdmin} from "../../store/actions/widgetsActions";
import {setSettings} from "../../store/actions/settingsActions";
import {getCustomPages} from "../../store/actions/adminPanelGlobalStateActions";
import {StoreTypes} from "../../_variables/TypeScriptTypes/GlobalTypes";
import styled from "styled-components";

const AdminDataSetterStyledSpan = styled.span`
  display: none;
`

const AdminDataSetter = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state :StoreTypes) => state.user.userData)

    useEffect(() => {
        if (userData?.role === 'administrator') {
            getAndSetDataForAdmin().then(() => console.log('welcome Admin, latest uncached data are sent for you'))
        }
    }, [userData]);


    const getAndSetDataForAdmin = async () => {
        try {
            const settingsData = await getMultipleSetting({settings: ['identity', 'design']}, localStorage.wt)
            const widgetData = await _getMultipleWidgets(localStorage.wt)

            dispatch(getCustomPages())

            // @ts-ignore
            if (widgetData?.data?.widgets) {
                // @ts-ignore
                dispatch(setWidgetsForAdmin(widgetData.data.widgets))
            }
            if (settingsData?.data) {
                // @ts-ignore
                const identityData = settingsData.data.settings ? settingsData.data.settings.find((setting:any) => setting.type === 'identity') : {}
                // @ts-ignore
                const designData = settingsData.data.settings ? settingsData.data.settings.find((setting:any) => setting.type === 'design') : {}
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
