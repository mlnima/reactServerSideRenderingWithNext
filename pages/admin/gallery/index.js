import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'

const gallery = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AdminLayout>
            <div className='gallery'>
                gallery
            </div>
        </AdminLayout>
    );
};
export default gallery;