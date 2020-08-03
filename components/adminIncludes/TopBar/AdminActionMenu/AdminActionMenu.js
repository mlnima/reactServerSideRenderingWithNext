import React from 'react';


const AdminActionMenu = props => {
    if (props.active) {
        return (
            <div className='AdminActionMenu'>
                <button className='AdminActionMenuItem adminTopBarItem'> My Profile</button>
                <button className='AdminActionMenuItem adminTopBarItem'> Edit My Profile</button>
                <button className='AdminActionMenuItem adminTopBarItem'> Log Out</button>
            </div>
        );
    } else return null
};
export default AdminActionMenu;