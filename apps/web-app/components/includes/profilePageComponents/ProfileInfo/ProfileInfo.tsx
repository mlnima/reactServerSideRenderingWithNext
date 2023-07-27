import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "@store_toolkit/hooks";

const MyProfileInfoStyledDiv = styled.div`
  p,h1,h2,h3,h4{
    color:var(--primary-text-color,#fff);
  }
`
const MyProfileInfo = () => {
    const userData = useAppSelector(({user}) => user?.userData)

    return (
        <MyProfileInfoStyledDiv className='my-profile-info'>
            <h2 className='username'>{userData?.username}</h2>
            <h2 className='name'>{userData?.firstName || ''} {userData?.lastName || ''}</h2>
            <h3 className='name'>{userData?.email} </h3>
        </MyProfileInfoStyledDiv>
    );
};
export default MyProfileInfo;
