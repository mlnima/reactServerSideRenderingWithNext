import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../components/layouts/AppLayout'

const Error = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AppLayout>
            <div className='notFoundPage'>
                <h1>error</h1>
            </div>
        </AppLayout>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error;
