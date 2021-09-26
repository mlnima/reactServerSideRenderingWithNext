import React, {useState, useEffect, useContext} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import ProfileCoverImage from '../../components/includes/profilePageComponents/ProfileCoverImage/ProfileCoverImage';
import ProfileNavigation from '../../components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation';
import MyProfileInfo from '../../components/includes/profilePageComponents/MyProfileInfo/MyProfileInfo';
import {getSignedInUserData} from "../../_variables/ajaxAuthVariables";
import {AppContext} from "../../context/AppContext";
import ProfileImage from "../../components/includes/profilePageComponents/ProfileImage/ProfileImage";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import Link from "next/link";

const ProfileStyledMain = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  color:var(--main-text-color);
  grid-area: main;
  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: .5px solid var(--main-text-color);
  }
  .profile-page-info{
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .profile-page-info-edit-link{
      color: var(--main-text-color);
    }
  }
  
  //.profile-posts{
  //  width: 300px;
  //}
  .profile-username{
    
  }

  .profile-posts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px 0;

    .profile-no-posts {
      border: .5px solid var(--main-text-color);
      border-radius: 50%;
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        color: var(--main-text-color);
        width: 75px;
        height: 75px;
      }
    }

    .profile-no-posts-title {
      color: var(--main-text-color);
    }
  }
`

const Profile = props => {
    const contextData = useContext(AppContext);

    useEffect(() => {
        getSignedInUserData(['username','role','keyMaster','profileImage','followingCount','followersCount']).then(res => {
            if (res?.data?.userData){
                contextData.dispatchUserData({
                    ...contextData.userData,
                    ...res.data.userData
                });
            }
        }).catch(err => {
            console.log(err);
            localStorage.removeItem('wt')
        })
    }, []);

    return (
        <ProfileStyledMain className='profile-page main'>
            <div className='profile-header'>
                <ProfileImage/>
                <ProfileNavigation/>
            </div>
            <div className='profile-page-info'>
                <p className='profile-username'>{contextData.userData.username}</p>
                {/*<Link href={'/profile/edit'}>*/}
                {/*    <a className='profile-page-info-edit-link'>*/}
                {/*        {props.t(`profile:Edit Profile`)}*/}
                {/*    </a>*/}
                {/*</Link>*/}
            </div>

            <div className='profile-posts'>
                <div className='profile-no-posts'>
                    <FontAwesomeIcon  className='upload-profile-image-btn-svg' icon={faCamera}/>
                </div>
                <h2 className='profile-no-posts-title'>No Post Yet </h2>
                <p className='profile-no-posts-title'> Coming Soon</p>
            </div>
        </ProfileStyledMain>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], 'profilePage');

    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common','customTranslation', 'profile'])),
            ...firstLoadData,
            query: context.query
        }
    }
}
export default withTranslation(['common','customTranslation', 'profile'])(Profile);

//     <MyProfileInfo/>
//<ProfileCoverImage/>
//width:'300px',height:'300px',