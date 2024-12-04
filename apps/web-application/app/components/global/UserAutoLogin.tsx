'use client';
import { useEffect } from 'react';
import { autoLoginAction } from '@store/reducers/userReducers/autoLoginAction';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAdminMode } from '@store/reducers/globalStateReducer';

const UserAutoLogin = () => {
    const dispatch = useAppDispatch();
    const { loggedIn, userData } = useAppSelector(({ user }) => user);

    useEffect(() => {
        if (!loggedIn) {
            const wt = localStorage.getItem('wt');
            if (wt) {
                dispatch(
                    autoLoginAction({
                        fields: [
                            'username',
                            'role',
                            'keyMaster',
                            'profileImage',
                            'followingCount',
                            'followersCount',
                            'draftPost',
                        ],
                    }),
                );
            }
        }
    }, []);

    useEffect(() => {
        const adminMode = localStorage.getItem('adminMode');
        if (userData?.role === 'administrator' && adminMode === 'true') {
            dispatch(setAdminMode(true));
        }
    }, [loggedIn]);

    return null;
};
export default UserAutoLogin;
