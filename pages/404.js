import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../components/layouts/AppLayout'

const Custom404 = props => {

    return (
        <AppLayout>
            <div className='notFoundPage'>
                <h1>404 - Page Not Found</h1>
            </div>
        </AppLayout>
    );
};
export default Custom404;
