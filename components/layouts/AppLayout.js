import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Head from "next/head";
import Header from "../includes/Header/Header";
import '../../styles/styles.scss';
import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";
import Loading from "../includes/Loading/Loading";
import { AppContext } from '../../context/AppContext'
import { generateAbsolutePath } from '../../_variables/_variables'

const AppLayout = props => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        contextData.dispatchAbsolutePath(window.location.origin)
    }, []);

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
