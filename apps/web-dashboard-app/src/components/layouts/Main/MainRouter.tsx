import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "../../pages/Home";
import Layout from "../RootLayout";

const MainRouter = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                {/*<Route index element={<Home/>}/>*/}
                <Route path="/dashboard" element={<Home/>}/>
            </Route>
        </Routes>
    )
};

export default MainRouter

