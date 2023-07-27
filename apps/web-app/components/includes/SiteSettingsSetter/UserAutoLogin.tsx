import {FC, useEffect} from "react";
import {autoLoginAction} from "@store_toolkit/clientReducers/userReducers/autoLoginAction";
import {useAppDispatch, useAppSelector} from "@store_toolkit/hooks";

interface UserAutoLoginPropTypes {
    renderAutoLogin: boolean
}

const UserAutoLogin: FC<UserAutoLoginPropTypes> = ({renderAutoLogin}) => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector((store) => store?.user?.loggedIn)

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
