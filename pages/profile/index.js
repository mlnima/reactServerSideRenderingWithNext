import React, {useState, useEffect} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables'
import ProfileCoverImage from '../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import ProfileComponentsRenderer from '../../components/includes/MyProfileComponents/ProfileComponentsRenderer/ProfileComponentsRenderer'
import MyProfileInfo from '../../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo'
import {useRouter} from "next/router";


import styled from "styled-components";

let StyledDiv = styled.div`
.upload-profile-image-btn-svg  {
    border: solid black 1px;
    background-color: white;
    border-radius: 50%;
    padding: 5px;
    z-index: 17;
    width: 25px;
    height: 25px;
}
`
const Profile = props => {

    return (
        <StyledDiv className='profile-page main'>
            <ProfileCoverImage/>
            <ProfileNavigation />
            <MyProfileInfo/>
        </StyledDiv>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar','profilePage'], 'profilePage')
    const widgets = firstLoadData.widgets

    return {
        props: {
            widgets,
            ...firstLoadData.widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query
        }
    }
}
export default Profile;
