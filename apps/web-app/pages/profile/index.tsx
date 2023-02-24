import ProfileNavigation from '../../components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation';
import ProfileImage from "../../components/includes/profilePageComponents/ProfileImage/ProfileImage";
import styled from "styled-components";
import Link from "next/link";
import {useSelector} from "react-redux";
import {wrapper} from "@store_toolkit/store";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import {Store} from "typescript-types";
import Posts from "@components/pagesIncludes/profile/Posts";

const PageStyle = styled.div`
  #primary{
    #main{
      display: flex;
      flex-direction: column;
      align-items: center;
      .profile-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
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
    }
  }
`

const Profile = () => {

    // @ts-ignore
    const userData = useSelector(({user}: Store) => user?.userData)

    const {sidebar} = useSelector(({settings}: Store) => {
        return {
            sidebar: settings?.identity?.profilePageSidebar,
        }
    });

    return (
        <PageStyle  className={`profile-page page-${sidebar || 'no'}-sidebar`} id={'content'}   >
            <div id={'primary'}>
                <main id={'main'}>

                    <div className='profile-header'>
                        <ProfileImage/>
                        <ProfileNavigation/>
                    </div>
                    <div className='profile-page-info'>
                        <h2 className='profile-username'>{userData?.username ? userData.username : ''}</h2>
                        <Link href={'/profile/edit'} className='btn-secondary btn profile-page-info-edit-link'>
                            Edit
                        </Link>
                    </div>
                    {/*//@ts-ignore*/}
                    <Posts userId={userData._id}/>
                </main>
            </div>

        </PageStyle>
    );
};
//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {

    // @ts-ignore
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ],
        {
            page: 'profile',
            setHeadData: true
        },
        store
    )

    return null
})

export default Profile;
