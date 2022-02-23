import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {autoUserLogin} from "../../../store/clientActions/userActions";
import {StoreTypes} from "../../../_variables/TypeScriptTypes/GlobalTypes";

interface UserAutoLoginPropTypes{
    renderAutoLogin:boolean
}

const UserAutoLogin: FC<UserAutoLoginPropTypes> = ({renderAutoLogin}) => {
    const dispatch = useDispatch()
    const loggedIn = useSelector((store :StoreTypes)=>store?.user?.loggedIn)

    useEffect(() => {
        if (!loggedIn) {
            dispatch(autoUserLogin(['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']))
        }
    }, [renderAutoLogin]);

    return <></>
};
export default UserAutoLogin
