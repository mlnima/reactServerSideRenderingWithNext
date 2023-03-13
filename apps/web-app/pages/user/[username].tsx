import React, {useEffect} from 'react';
import UserPageActionButtons
    from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";
import {useRouter} from "next/router";
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import {wrapper} from "@store_toolkit/store";
import {useSelector} from "react-redux";
import {fetchSpecificUserData, fetchUserPageData} from "@store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "@store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import SvgRenderer from "../../components/global/commonComponents/SvgRenderer/SvgRenderer";
import UserPreviewImage from "ui/src/UserPreviewImage";
import {Store} from "typescript-types";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";

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

      .follow-count {
        width: 100%;
        display: flex;

        p {
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

const user = () => {
    const {t} = useTranslation('common');
    const dispatch = useAppDispatch()
    const router = useRouter()
    const {userData,userPageData} = useSelector(({user}:Store) =>user)

    useEffect(() => {
         setTimeout(()=>{
             getUserData()
         },500)
    }, []);

    const getUserData = async () => {
        try {
            dispatch(fetchUserPageData({
                username: router.query.username as string,
                _id: undefined,
                fields: ['following', 'followers', 'blockList']
            }))
            dispatch(fetchSpecificUserData({
                fields: ['following', 'followers', 'blockList'
                ]
            }))
        } catch (err) {
            console.log(err)
        }
    }


    if (userPageData?._id && userPageData?.username){
        return (
            <UserPageStyledDiv className='user-page main'>
                <HeadSetter title={userPageData?.username}/>
                <div className='profile-header'>
                    {!!userPageData?.profileImage &&
                        <UserPreviewImage imageUrl={userPageData?.profileImage} size={150}/>}
                    <div className='profile-header-info-actions'>
                        <h3>{userPageData?.username}</h3>

                        <UserPageActionButtons _id={userData?._id}/>
                        <div className='follow-count'>
                            <p>
                                {t('common:Followers', {}, {fallback: 'Followers'})} :
                                <span>{userPageData?.followers ? userPageData.followers?.length : 0}</span>
                            </p>
                            <p>
                                {t('common:Following', {}, {fallback: 'Following'})}:
                                <span>{userPageData?.following ? userPageData.following?.length : 0}</span>
                            </p>
                        </div>

                    </div>
                </div>
                <div className='profile-posts'>
                    <div className='profile-no-posts'>
                        <SvgRenderer svgUrl={'/asset/images/icons/camera-solid.svg'}
                                     size={20}
                                     customClassName={'upload-profile-image-btn-svg'}
                                     color={'var(--main-text-color, #ccc)'}/>
                    </div>
                    <h2 className='profile-no-posts-title'>No Post Yet </h2>
                    <p className='profile-no-posts-title'> Coming Soon</p>
                </div>

            </UserPageStyledDiv>
        );
    }else return null



};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'userPageRightSidebar',
            'userPageLeftSidebar',
        ],
        {
            setHeadData: true,
            page: 'user'
        },
        store)

    return null

})

export default user;
///public
