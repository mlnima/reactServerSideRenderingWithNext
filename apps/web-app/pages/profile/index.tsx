import ProfileNavigation from '../../components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation';
import ProfileImage from "../../components/includes/profilePageComponents/ProfileImage/ProfileImage";
import styled from "styled-components";
import Link from "next/link";
import {useSelector} from "react-redux";
import {wrapper} from "../../store_toolkit/store";
import _getServerSideStaticPageData from "../../store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import SvgRenderer from "../../components/global/commonComponents/SvgRenderer/SvgRenderer";

const ProfileStyledMain = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  color: var(--main-text-color);
  grid-area: main !important;

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: .5px solid var(--main-text-color);
  }

  .profile-page-info {
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .profile-page-info-edit-link {
      color: var(--main-text-color);
    }
  }

  .profile-username {

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

const Profile = () => {

    // @ts-ignore
    const userData = useSelector(({user} : Store) => user?.userData)

    return (
        <ProfileStyledMain className='profile-page main'>
            <div className='profile-header'>
                <ProfileImage/>
                <ProfileNavigation/>
            </div>
            <div className='profile-page-info'>
                <p className='profile-username'>{ userData?.username ? userData.username :''}</p>
                <Link href={'/profile/edit'} className='btn-secondary btn profile-page-info-edit-link'>
                        Edit
                </Link>
            </div>

            <div className='profile-posts'>
                <div className='profile-no-posts'>

                    <SvgRenderer svgUrl={'/asset/images/icons/camera-solid.svg'}
                                 size={20}
                                 color={'var(--main-text-color, #fff)'}/>
                </div>
                <h2 className='profile-no-posts-title'>No Post Yet </h2>
                <p className='profile-no-posts-title'> Coming Soon</p>
            </div>
        </ProfileStyledMain>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profilePage'
        ],
        {
            page:'profile',
            setHeadData:true
        },
        store
    )

    return null
})

export default Profile;
