import React from "react";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Assets from "../pages/Assets/Assets";
import Post from "@components/pages/Post/Post";

const MainRouter = () => {
    return (
        <Routes>
            {/*<Route element={<PrivateRoutes/>}>*/}
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/assets" element={<Assets/>}/>
                <Route path="/dashboard/post" element={<Post/>}/>
                <Route path="*" element={<NotFound/>}/>
            {/*</Route>*/}
            <Route element={<Login/>} path={'/dashboard/login'}/>
        </Routes>
    )
};

export default MainRouter
