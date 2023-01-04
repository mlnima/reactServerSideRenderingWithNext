import {FC, useEffect} from "react";
import {useAppDispatch} from "../../../store_toolkit/hooks";
import {getUncachedWidgetsForAdmin} from "../../../store_toolkit/clientReducers/widgetsReducer";
import {getUncachedSettingsForAdmin} from "../../../store_toolkit/clientReducers/settingsReducer";
import {useRouter} from "next/router";

const AppLayoutAdminDataInitializer: FC = () => {
    const dispatch = useAppDispatch()
    const {asPath, pathname} = useRouter()

    useEffect(() => {
        setTimeout(() => {
            // dispatch(getUncachedWidgetsForAdmin(null))
            // dispatch(getUncachedSettingsForAdmin(null))
        }, 2000)


    }, [asPath, pathname]);

    return null
};
export default AppLayoutAdminDataInitializer;
