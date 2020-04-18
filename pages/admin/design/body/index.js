import React, { useEffect, useState, useContext, useRef } from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import UrlSection from '../../../../components/adminIncludes/design/UrlSection'

const body = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);



    return (
        <AdminLayout>
            <div className='body-design-setting'>
                <UrlSection designName='bodyBackgroundImage'/>
            </div>
        </AdminLayout>
    );
};
export default body;
