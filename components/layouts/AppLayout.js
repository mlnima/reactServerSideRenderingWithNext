import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Head from "next/head";
import Header from "../includes/Header/Header";
import '../../styles/styles.scss';
import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";
import Loading from "../includes/Loading/Loading";

const AppLayout = props => {
    return (
        <>
            <TopBar/>
            <Header/>
            <Navigation/>
            <Loading/>
            <div className="App">
                { props.children }
            </div>
        </>
    );
};

export default AppLayout;
