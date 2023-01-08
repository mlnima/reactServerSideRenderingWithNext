import React from "react";
import {Routes, Route} from 'react-router-dom';
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/messenger" element={<div>Chat App</div>}/>
            <Route path={'/dashboard/login'} element={<Login/>} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
};

export default MainRouter
