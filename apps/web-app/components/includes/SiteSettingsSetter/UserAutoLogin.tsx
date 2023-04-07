import {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {autoLoginAction} from "@store_toolkit/clientReducers/userReducers/autoLoginAction";
import {useAppDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";

interface UserAutoLoginPropTypes {
    renderAutoLogin: boolean
}

const UserAutoLogin: FC<UserAutoLoginPropTypes> = ({renderAutoLogin}) => {
    const dispatch = useAppDispatch()
    const loggedIn = useSelector((store: Store) => store?.user?.loggedIn)

    useEffect(() => {
        if (!loggedIn) {
            !!localStorage?.wt && dispatch(
                autoLoginAction(
                    {
                        fields: ['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount','draftPost']
                    }
                ))
        }
    }, [renderAutoLogin]);

    return null
};
export default UserAutoLogin
