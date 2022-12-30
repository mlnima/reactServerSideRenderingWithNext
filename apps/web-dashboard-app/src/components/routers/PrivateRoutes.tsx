import {Outlet, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {DashboardStore} from "typescript-types";
import {useEffect} from "react";

const PrivateRoutes = () => {
    let auth = false
    // const isUserLoggedIn = useSelector(({users}: DashboardStore) => users.isUserLoggedIn)
    // const store = useSelector((store: DashboardStore) => store)
    // useEffect(() => {
    //     console.log(isUserLoggedIn)
    // }, [isUserLoggedIn]);

    return (
        auth ? <Outlet/> : <Navigate to={'/dashboard/login'}/>
    )
}

export default PrivateRoutes;