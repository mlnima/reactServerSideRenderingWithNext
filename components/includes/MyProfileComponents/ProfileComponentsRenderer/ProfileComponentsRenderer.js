import React, { useEffect, useState, useContext, useRef } from 'react';
import MyProfileInfo from '../MyProfileInfo/MyProfileInfo'
import MyProfilePosts from '../MyProfilePosts/MyProfilePosts'

const ProfileComponentsRenderer = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const WhatToRender= ()=>{
        if (props.activeComponent==='MyProfileInfo'){
            return(
                <MyProfileInfo/>
            )
        }else if (props.activeComponent==='MyProfilePosts'){
            return(
                <MyProfilePosts/>
            )
        }else return null
    }
    return (
        <div className='profile-component'>
           <WhatToRender/>
        </div>
    );
};
export default ProfileComponentsRenderer;
