import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../components/layouts/AdminLayout'
import TableHeader from '../../../components/adminIncludes/assetComponents/TableHeader/TableHeader'

const index = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AdminLayout>
            <div className='admin-asset-page'>
                <TableHeader/>
            </div>
        </AdminLayout>
    );
};
export default index;
