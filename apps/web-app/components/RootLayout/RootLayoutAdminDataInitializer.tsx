import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";
import {getUncachedWidgetsForAdminAction} from "@store_toolkit/clientReducers/widgetsReducer";
import {getUncachedSettingsForAdmin} from "@store_toolkit/clientReducers/settingsReducer";
import {useRouter} from "next/router";

const RootLayoutAdminDataInitializer: FC = () => {
    const dispatch = useAppDispatch()
    const {asPath, pathname} = useRouter()
    const adminMode = useAppSelector(({globalState}) => globalState.adminMode)
    const {userData} = useAppSelector(({user}) =>user)

    useEffect(() => {
        if (userData?.role === 'administrator' && adminMode ){
            setTimeout(() => {
                dispatch(getUncachedWidgetsForAdminAction(null))
                dispatch(getUncachedSettingsForAdmin(null))
            }, 10)
        }
    }, [asPath, pathname,adminMode]);

    return null
};
export default RootLayoutAdminDataInitializer;
