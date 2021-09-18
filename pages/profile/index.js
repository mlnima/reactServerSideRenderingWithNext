import React, {useState, useEffect, useContext} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import ProfileCoverImage from '../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage';
import ProfileNavigation from '../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation';
import MyProfileInfo from '../../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo';
import {getSignedInUserData} from "../../_variables/ajaxAuthVariables";
import {AppContext} from "../../context/AppContext";
import ProfileImage from "../../components/includes/MyProfileComponents/ProfileImage/ProfileImage";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

import styled from "styled-components";
import {withTranslation} from "next-i18next";
const ProfileStyledMain = styled.main`
  max-width: 940px;
  margin: auto;
  .profile-header {
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: .5px solid var(--main-text-color);
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
            ...(await serverSideTranslations(context.locale, ['common','customTranslation'])),
            widgets:firstLoadData?.widgets || [],
            // ...firstLoadData.widgets,
            ...firstLoadData.settings,
            isMobile: Boolean(firstLoadData.isMobile),
            referer: firstLoadData.referer,
            query: context.query
        }
    }
}
export default withTranslation(['common'])(Profile);

//     <MyProfileInfo/>
//<ProfileCoverImage/>
//width:'300px',height:'300px',