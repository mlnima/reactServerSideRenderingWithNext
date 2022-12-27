import {Outlet,Navigate} from "react-router-dom";

const PrivateRoutes = ()=>{
    let auth = true

    return(
        auth ? <Outlet/> : <Navigate to={'/dashboard/login'}/>
    )
}

export default PrivateRoutes;