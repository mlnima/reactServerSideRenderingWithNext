import React, {useEffect, useState, useContext, useRef} from 'react';
import {AppContext} from '../../../../context/AppContext'

const MyProfileInfo = props => {
    const contextData = useContext(AppContext);

    return (
        <div className='my-profile-info'>
        <style jsx>{`
        .my-profile-info{
        
        }
        p,h1,h2,h3,h4{
          color:var(--main-text-color);
        }
        
        .username{
        
        }
        
        `}</style>
            <h2 className='username'>{contextData.userData.username}</h2>
            <h2 className='name'>{contextData.userData.firstName} {contextData.userData.lastName || ''}</h2>
            <h3 className='name'>{contextData.userData.email} </h3>
        </div>
    );
};
export default MyProfileInfo;
