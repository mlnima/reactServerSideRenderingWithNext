import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../components/layouts/AppLayout'

const notFoundPage = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AppLayout>
        <div className='notFoundPage'>
            <h1>404 - Page Not Found</h1>
        </div>
        </AppLayout>
    );
};
export default notFoundPage;
