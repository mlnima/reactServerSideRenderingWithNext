import React, {useEffect} from 'react';
import RootLayout from "./components/layouts/RootLayout";
import GlobalStyles from "./global/style/GlobalStyles";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import Login from "@components/pages/Login";
import {autologinUserAction} from "@store/reducers/usersReducer";
import {useAppDispatch} from "@store/hooks";

function App() {
    //@ts-ignore
    const isUserLoggedIn = useSelector(({users}: DashboardStore) => users.isUserLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (localStorage.wt) {
            dispatch(autologinUserAction({
                fields: ['username', 'role', 'keyMaster', 'profileImage', 'followingCount', 'followersCount']
            }))
        }
    }, [localStorage.wt]);

    return (
        <div className="App">
            <GlobalStyles/>
            {isUserLoggedIn ? <RootLayout/> : <Login/>}
        </div>
    );

}

export default App;
