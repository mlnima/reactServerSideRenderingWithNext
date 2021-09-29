import React, {useContext, useState, useEffect} from 'react';
import {getFirstLoadData} from "../../_variables/ajaxVariables";
import {getUserPreviewData} from "../../_variables/_userSocialAjaxVariables";
import UserPageProfileImage from "../../components/includes/userPageComponents/UserPageProfileImage/UserPageProfileImage";
import UserPageActionButtons from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";

import SendMessagePopUp from "../../components/includes/userPageComponents/SendMessagePopUp/SendMessagePopUp";
import {AppContext} from "../../context/AppContext";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import styled from "styled-components";
import {withTranslation} from "next-i18next";
import {ClientPagesTypes} from "../../_variables/TypeScriptTypes/ClientPagesTypes";
import {wrapper} from "../../store/store";
import {UserInterface} from "../../_variables/TypeScriptTypes/UserInterfaces";

const UserPageStyledDiv = styled.div`
  color: var(--main-text-color);
  max-width: 940px;
  margin: auto;
  font-size: 12px;
  .profile-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: .5px solid var(--main-text-color);

    .profile-header-info-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .follow-count{
        width: 100%;
        display: flex;
        p{
          margin: 5px 10px;
        }
      }
    }
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
        width: 75px;
        height: 75px;
      }
    }

    .profile-no-posts-title {
      color: var(--main-text-color);
    }
  }
`

const user =  (props:ClientPagesTypes) => {
    const contextData = useContext(AppContext);
    const router = useRouter()
    const [state, setState] = useState({
        messagePop: false
    });

    const [userData, setUserData] = useState(() => {})


    const onCloseMessagePop = () => {
        setState({
            ...state,
            messagePop: false
        })
    }

    // useEffect(() => {
    //     console.log(userData)
    // }, [userData]);

    useEffect(() => {
        getUserData()
    }, [contextData.userData._id]);


    const getUserData = async () => {
        try {
            const userPreviewData = await getUserPreviewData(router.query.username, undefined, ['following', 'followers', 'blockList']);
            const myFriendRequestData = await getUserPreviewData(undefined, contextData.userData._id, ['following', 'followers', 'blockList']);
            contextData.dispatchUserData((userData: any) => ({...userData, ...myFriendRequestData.data.userData}))
            setUserData(userPreviewData.data.userData);

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <UserPageStyledDiv className='user-page main'>


            <div className='profile-header'>
                <UserPageProfileImage
                    // @ts-ignore
                    gender={userData?.gender}
                    // @ts-ignore
                    profileImage={userData?.profileImage}
                />
                <div className='profile-header-info-actions'>

                    <h3>{
                        // @ts-ignore
                        userData?.username
                    }</h3>
                    {
                        // @ts-ignore
                        contextData?.userData?.username !== userData?.username ?
                        <UserPageActionButtons
                            setParentState={setState}
                            userData={userData}

                            parentState={state}
                            // @ts-ignore
                            _id={userData?._id}
                        /> : null
                    }
                    <div className='follow-count'>
                        <p>{props.t([`common:Followers`])} :  <span>{
                            // @ts-ignore
                            userData?.followers ? userData.followers?.length : 0
                        }</span></p>
                        <p>{props.t([`common:Following`])} :  <span>{
                            // @ts-ignore
                            userData?.following ? userData.following?.length : 0
                        }</span></p>
                    </div>
                </div>
            </div>
            <div className='profile-posts'>
                <div className='profile-no-posts'>
                    <FontAwesomeIcon style={{color: 'var(--main-text-color)'}} className='upload-profile-image-btn-svg' icon={faCamera}/>
                </div>
                <h2 className='profile-no-posts-title'>No Post Yet </h2>
                <p className='profile-no-posts-title'> Coming Soon</p>
            </div>

        </UserPageStyledDiv>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['userPageRightSidebar,userPageLeftSidebar'], store)

    return {
        props: {
            ...(await serverSideTranslations(context.locale as string, ['common', 'customTranslation'])),
            ...firstLoadData,
            query: context.query,
            // userData: userData || null
        }
    }
})


export default withTranslation(['common'])(user);

