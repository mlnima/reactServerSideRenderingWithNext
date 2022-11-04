import {FC, useEffect} from "react";
import {useAppDispatch} from "../../../store_toolkit/hooks";
import {getUncachedWidgetsForAdmin} from "../../../store_toolkit/clientReducers/widgetsReducer";
import {getUncachedSettingsForAdmin} from "../../../store_toolkit/clientReducers/settingsReducer";
import {useRouter} from "next/router";

const AppLayoutAdminDataInitializer: FC = () => {
    const dispatch = useAppDispatch()
    const {asPath,pathname} = useRouter()

    useEffect(() => {

        dispatch(getUncachedWidgetsForAdmin(null))
        dispatch(getUncachedSettingsForAdmin(null))

    }, [asPath,pathname]);

    return null
};
export default AppLayoutAdminDataInitializer;
