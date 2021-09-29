import React, {useContext} from 'react';
import {AppContext} from '../../../../context/AppContext'
import styled from "styled-components";
const MyProfileInfoStyledDiv = styled.div`
  p,h1,h2,h3,h4{
    color:var(--main-text-color);
  }
`
const MyProfileInfo = props => {
    const contextData = useContext(AppContext);

    return (
        <MyProfileInfoStyledDiv className='my-profile-info'>
            <h2 className='username'>{contextData.userData.username}</h2>
            <h2 className='name'>{contextData.userData.firstName} {contextData.userData.lastName || ''}</h2>
            <h3 className='name'>{contextData.userData.email} </h3>
        </MyProfileInfoStyledDiv>
    );
};
export default MyProfileInfo;
