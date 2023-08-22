'use client';
import {FC, useEffect} from "react";
import {autoLoginAction} from "@store/reducers/userReducers/autoLoginAction";
import {useAppDispatch, useAppSelector} from "@store/hooks";

const UserAutoLogin: FC = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector((store) => store?.user?.loggedIn)

    useEffect(() => {
        if (!loggedIn) {
            !!localStorage?.wt && dispatch(
                autoLoginAction(
                    {
                        fields: [
                            'username',
                            'role',
                            'keyMaster',
                            'profileImage',
                            'followingCount',
                            'followersCount',
                            'draftPost'
                        ]
                    }
                ))
        }
    }, []);

    return null
};
export default UserAutoLogin;
