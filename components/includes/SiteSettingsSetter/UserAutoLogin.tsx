import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {fetchUserAutoLogin} from "@store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "@store_toolkit/hooks";

interface UserAutoLoginPropTypes {
    renderAutoLogin: boolean
}

const UserAutoLogin: FC<UserAutoLoginPropTypes> = ({renderAutoLogin}) => {
    const dispatch = useAppDispatch()
    const loggedIn = useSelector((store: StoreTypes) => store?.user?.loggedIn)

    useEffect(() => {
        if (!loggedIn) {
            !!localStorage?.wt && dispatch(
                fetchUserAutoLogin(
                    {
                        fields: ['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']
                    }
                ))
        }
    }, [renderAutoLogin]);

    return null
};
export default UserAutoLogin
