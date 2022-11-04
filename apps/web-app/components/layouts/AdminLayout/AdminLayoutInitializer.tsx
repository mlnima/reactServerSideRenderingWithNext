import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import Loading from "@components/global/commonComponents/Loading/Loading";
import AlertBox from "@components/global/commonComponents/AlertBox/AlertBox";
import {useAppDispatch} from "@store_toolkit/hooks";
import {closeAlert} from "@store_toolkit/adminReducers/adminPanelGlobalStateReducer";

interface AdminLayoutInitializerPropTypes {

}

const AdminLayoutInitializer: FC<AdminLayoutInitializerPropTypes> = () => {
    const dispatch = useAppDispatch();
    const {isLoading, alert} = useSelector(({adminPanelGlobalState}: Store) => {
        return {
            isLoading: adminPanelGlobalState?.loading,
            alert: adminPanelGlobalState?.alert,
        }
    });


    // useEffect(() => {
    //     console.log(isLoading)
    //     console.log(alert)
    // }, [isLoading,alert]);

    const closeAdminpanelAlert = ()=>{
        dispatch(closeAlert(null))
    }

    return (
        <>
            <Loading isLoading={isLoading}/>
            <AlertBox alert={alert} closeAdminpanelAlert={closeAdminpanelAlert}/>
        </>
    )
};
export default AdminLayoutInitializer;


