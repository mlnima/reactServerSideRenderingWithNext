import React, { useEffect, useState, useContext, useRef } from 'react';
import MyProfileInfo from '../MyProfileInfo/MyProfileInfo'
import MyProfilePosts from '../MyProfilePosts/MyProfilePosts'
import withRouter from 'next/dist/client/with-router'

const ProfileComponentsRenderer = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const WhatToRender= ()=>{
        if (props.router){
            if (props.router.query.tab==='MyProfileInfo'||!props.router.query.tab){
                return(
                    <MyProfileInfo/>
                )
            }else if (props.router.query.tab==='MyProfilePosts'){
                return(
                    <MyProfilePosts/>
                )
            }else return null
        }else return null

    }
    return (
        <div className='profile-component'>
           <WhatToRender/>
        </div>
    );
};
export default withRouter(ProfileComponentsRenderer);
