import React, { useEffect } from 'react';
import RootLayout from '@components/layouts/RootLayout';
import GlobalStyles from '@components/common/styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { DashboardStore } from 'typescript-types';
import Login from '@components/pages/Login';
import { autologinUserAction } from '@store/reducers/usersReducer';
import { useAppDispatch } from '@store/hooks';
import { getSettingsAction } from '@store/reducers/settingsReducer';
import { getWidgetsAction } from '@store/reducers/widgetsReducer';
import { getCustomPagesAction } from '@store/reducers/globalStateReducer';
import '@repo/shared-style';

function App() {

    //@ts-ignore
    const { isUserLoggedIn, role } = useSelector(({ users }: DashboardStore) => {
        return {
            isUserLoggedIn: users.isUserLoggedIn,
            role: users.userData.role,
        };
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(
                autologinUserAction({
                    fields: [
                        'username',
                        'role',
                        'keyMaster',
                        'profileImage',
                        'followingCount',
                        'followersCount',
                    ],
                }),
            );
        }
    }, [localStorage.wt]);

    useEffect(() => {
        if (role === 'administrator') {
            getAndSetDataForAdmin();
        }
    }, [role]);

    const getAndSetDataForAdmin = async () => {
        try {
            dispatch(getWidgetsAction(null));
            dispatch(getCustomPagesAction(null));
            dispatch(getSettingsAction(null));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <GlobalStyles />
            {isUserLoggedIn && role === 'administrator' ? <RootLayout /> : <Login />}
        </div>
    );
}

export default App;
