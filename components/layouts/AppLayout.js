import React, { useContext, useEffect } from 'react';
import Header from "../includes/Header/Header";

import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";
import Loading from "../includes/Loading/Loading";
import AlertBox from '../includes/AlertBox/AlertBox'
// import { AppContext } from '../../context/AppContext'
// import Router from "next/router";
// import withGA from "next-ga";

const AppLayout = props => {
    // const contextData = useContext(AppContext);

    return (
        <>
            <TopBar/>
            <Header/>
            <Navigation/>
            <Loading/>
            <AlertBox/>
            <div className="App">
                { props.children }
            </div>
        </>
    );
};

export default AppLayout ;
