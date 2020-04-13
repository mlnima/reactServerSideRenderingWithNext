import React from 'react';
import AdminLayout from '../../../../components/layouts/AdminLayout';
import { AppContext } from '../../../../context/AppContext'
import './topBar.scss'
import ColorSection from '../../../../components/adminIncludes/design/ColorSection'

const topBar = props => {
    return (
        <AdminLayout>
            <div className='topBarSettings'>
                <h1>Top Bar Settings :</h1>
                <div className='colorSettingSections'>
                    <ColorSection designName='topBarBackgroundColor'/>
                    <ColorSection designName='topBarTextColor'/>
                </div>
            </div>
        </AdminLayout>
    );
};
export default topBar;
