import React, {useEffect} from 'react';
import RootLayout from "./components/layouts/RootLayout";
import GlobalStyles from "./global/style/GlobalStyles";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import Login from "@components/pages/Login";
import {autologinUserAction} from "@store/reducers/usersReducer";
import {useAppDispatch} from "@store/hooks";
import {getSettingsAction} from "@store/reducers/settingsReducer";
import {getCustomPagesAction} from "@store/reducers/globalStateReducer";

function App() {
    //@ts-ignore
    const {isUserLoggedIn, role} = useSelector(({users}: DashboardStore) => {
        return {
            isUserLoggedIn: users.isUserLoggedIn,
            role: users.userData.role
        }
    })
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(autologinUserAction({
                fields: ['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']
            }))
        }
    }, [localStorage.wt]);

    useEffect(() => {
        if (role === 'administrator') {
            getAndSetDataForAdmin()
        }
    }, [role]);

    const getAndSetDataForAdmin = async () => {
        try {
            dispatch(getCustomPagesAction(null));
            dispatch(getSettingsAction(null));
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="App">
            <GlobalStyles/>
            {isUserLoggedIn ? <RootLayout/> : <Login/>}
        </div>
    );

}

export default App;