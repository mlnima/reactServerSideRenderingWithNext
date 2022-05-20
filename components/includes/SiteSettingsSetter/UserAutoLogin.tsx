import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
import {fetchUserAutoLogin} from "@store_toolkit/clientReducers/userReducer";

interface UserAutoLoginPropTypes {
    renderAutoLogin: boolean
}

const UserAutoLogin: FC<UserAutoLoginPropTypes> = ({renderAutoLogin}) => {
    const dispatch = useDispatch()
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
