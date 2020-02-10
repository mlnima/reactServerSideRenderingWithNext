import React from 'react';

import './AdminActionMenu.scss'

const AdminActionMenu = props => {
    if (props.active) {
        return (
            <div className='AdminActionMenu'>
                <button className='AdminActionMenuItem'> My Profile</button>
                <button className='AdminActionMenuItem'> Edit My Profile</button>
                <button className='AdminActionMenuItem'> Log Out</button>
            </div>
        );
    } else return null
};
export default AdminActionMenu;