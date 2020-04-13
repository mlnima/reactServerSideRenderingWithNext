import React from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'

const footer = props => {

// need to fix
    return (
        <AdminLayout>
            <div className='header-setting'>
                <h1>Footer Settings :</h1>
                <div className='colorSettingSections'>
                    <ColorSection designName='footerBackgroundColor'/>
                    <ColorSection designName='footerTextColor'/>
                </div>
            </div>
        </AdminLayout>
    );
};
export default footer;
