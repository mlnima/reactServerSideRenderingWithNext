import React from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout'

import ColorSection from '../../../../components/adminIncludes/design/ColorSection'

const MyComponent = props => {

    return (
        <AdminLayout>
            <div className='header-setting'>
                <h1>Header Settings :</h1>
                <div className='colorSettingSections'>
                    <ColorSection designName='headerBackgroundColor'/>
                    <ColorSection designName='headerTextColor'/>
                </div>
            </div>
        </AdminLayout>
    );
};
export default MyComponent;
