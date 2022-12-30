import React from "react";
import {Routes, Route} from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Assets from "../pages/Assets/Assets";
import RootLayout from "@components/layouts/RootLayout";

const RootRouter = () => {
    return (
        <Routes>
            <Route element={<RootLayout/>}>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard/assets" element={<Assets/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
};

export default RootRouter

