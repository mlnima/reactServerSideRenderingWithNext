import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'

const index = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <div>
            <AdminLayout>
            pages
            </AdminLayout>
        </div>
    );
};
export default index;
