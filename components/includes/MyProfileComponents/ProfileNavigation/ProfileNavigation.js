import React, { useEffect, useState, useContext, useRef } from 'react';
import { AppContext } from '../../../../context/AppContext'

const ProfileNavigation = props => {
    const contextData = useContext(AppContext);
    const [ navigationData, setNavigationData ] = useState({
        isOpen: false,
        style:{}
    });

    useEffect(() => {
        setNavigationData({
            ...navigationData,
            style:{
                backgroundColor:contextData.siteDesign.navigationBackgroundColor,
                color:contextData.siteDesign.navigationTextColor
            }
        })
    }, [contextData.siteDesign]);

    const onTabChangeHandler = e => {
        props.setState({
            ...props.state,
            activeTab:e.target.name
        })
    }

    return (
        <div className='profile-navigation' style={navigationData.style}>
            <button style={navigationData.style} name='MyProfileInfo' onClick={e=>onTabChangeHandler(e)}>Profile</button>
            <button style={navigationData.style} name='MyProfilePosts' onClick={e=>onTabChangeHandler(e)}>My Posts</button>
        </div>
    );
};
export default ProfileNavigation;
