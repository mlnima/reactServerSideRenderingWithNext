import React, {useState} from 'react';

import {getFirstLoadData} from '../../_variables/ajaxVariables'
import ProfileCoverImage from '../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import ProfileComponentsRenderer from '../../components/includes/MyProfileComponents/ProfileComponentsRenderer/ProfileComponentsRenderer'
import MyProfileInfo from '../../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo'
import styled from "styled-components";
let StyledDiv = styled.div`
  .upload-profile-image-btn {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: transparent;
    border: none;
    outline: none;
     opacity: 50%;
    .fontawesomeSvgSmall  {
      border: solid black 1px;
      background-color: white;
      border-radius: 50%;
      padding: 5px;
      z-index: 17;
      width: 25px;
      height: 25px;
    }
  }


  .profile-cover-image {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    height: 300px;

    .profile-image {
      position: absolute;
      bottom: 0;
      left: 5%;
      border: black 1px solid;
      .profile-image-img {
        width: 150px;
      }
    }
  }
`
const Profile = props => {
    const [ state, setState ] = useState({
        activeTab:'MyProfileInfo'
    });

    return (
            <StyledDiv className='profile-page main'>
                <ProfileCoverImage/>
                <ProfileNavigation state={state} setState={setState}/>
                <ProfileComponentsRenderer activeComponent={state.activeTab}/>
            </StyledDiv>
    );
};

export const getServerSideProps = async ({req,query}) => {
    const firstLoadData = await getFirstLoadData(req,[])
    return {props:{widgets:firstLoadData.widgets,  ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile),query }}
}
export default Profile;
