import React from 'react';
import Head from "next/head";
import Header from "../includes/Header/Header";
import './Router.scss'
import '../../styles/styles.scss';
import TopBar from "../includes/TopBar/TopBar";
import Navigation from "../includes/Header/Navigation/Navigation";

const Router = props => {
    return (
        <>
            <Head>
                <title>Website Title</title>
                <meta name="theme-color" content="#000000"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <script src="https://kit.fontawesome.com/e9c7c74c80.js" crossOrigin="anonymous"/>
            </Head>
            <TopBar/>
            <Header/>
            <Navigation/>
            <div className="App">
                { props.children }
            </div>
        </>
);
};

export default Router;
