import {FC, useEffect} from "react";
import {useAppDispatch} from "@store_toolkit/hooks";
import {getUncachedWidgetsForAdminAction} from "@store_toolkit/clientReducers/widgetsReducer";
import {getUncachedSettingsForAdmin} from "@store_toolkit/clientReducers/settingsReducer";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";

const AppLayoutAdminDataInitializer: FC = () => {
    const dispatch = useAppDispatch()
    const {asPath, pathname} = useRouter()
    const adminMode = useSelector(({globalState}: Store) => globalState.adminMode)
    const {userData} = useSelector(({user}: Store) =>user)


    useEffect(() => {
        setTimeout(() => {
            if (userData?.role === 'administrator'){
                dispatch(getUncachedWidgetsForAdminAction(null))
                dispatch(getUncachedSettingsForAdmin(null))
            }
        }, 2000)
    }, [asPath, pathname,adminMode]);



    return null
};
export default AppLayoutAdminDataInitializer;
