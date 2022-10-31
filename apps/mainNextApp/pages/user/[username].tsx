import {useEffect} from 'react';
import UserPageProfileImage
    from "../../components/includes/userPageComponents/UserPageProfileImage/UserPageProfileImage";
import UserPageActionButtons from "../../components/includes/userPageComponents/UserPageActionButtons/UserPageActionButtons";
import {useRouter} from "next/router";
import styled from "styled-components";
import useTranslation from 'next-translate/useTranslation'
import {wrapper} from "../../store_toolkit/store";
import {useSelector} from "react-redux";
import {fetchSpecificUserData, fetchUserPageData} from "../../store_toolkit/clientReducers/userReducer";
import {useAppDispatch} from "../../store_toolkit/hooks";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import SvgRenderer from "../../components/global/commonComponents/SvgRenderer/SvgRenderer";

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
    // @ts-ignore
    const userPageData = useSelector(store => store.user.userPageData)
    // @ts-ignore
    const userData = useSelector(store => store.user.userData)

    useEffect(() => {
        getUserData()
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


    return (
        <UserPageStyledDiv className='user-page main'>

            <div className='profile-header'>
                {userPageData?._id ?
                    <UserPageProfileImage
                        // @ts-ignore
                        gender={userPageData?.gender}
                        // @ts-ignore
                        profileImage={userPageData?.profileImage}
                    /> : null
                }

                <div className='profile-header-info-actions'>

                    {userPageData?.username ?
                        <h3>{
                            // @ts-ignore
                            userPageData?.username
                        }
                        </h3> : null
                    }

                    {
                        // @ts-ignore
                        userData?.username !== userPageData?.username && userPageData?._id ?
                            <UserPageActionButtons
                                _id={userData?._id}
                            /> : null
                    }
                    {userPageData?._id ?
                        <div className='follow-count'>
                            <p>{t('common:Followers',{},{fallback:'Followers'})} : <span>{
                                // @ts-ignore
                                userPageData?.followers ? userPageData.followers?.length : 0
                            }</span></p>
                            <p>{t('common:Following',{},{fallback:'Following'})}: <span>{
                                // @ts-ignore
                                userPageData?.following ? userPageData.following?.length : 0
                            }</span></p>
                        </div> : null
                    }

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
};

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
