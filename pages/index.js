import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import AppLayout from "../components/layouts/AppLayout";

const Home = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AppLayout>
            <div className='HomePage'>
                <h1>Header 1</h1>
            </div>
        </AppLayout>
    );
};

export default Home;


