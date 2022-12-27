import React from "react";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Assets from "../pages/Assets/Assets";

const RootRouter = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/assets" element={<Assets/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
            <Route element={<Login/>} path={'/dashboard/login'}/>
        </Routes>
    )
};

export default RootRouter

