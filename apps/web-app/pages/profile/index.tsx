import ProfileNavigation from '../../components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation';
import styled from "styled-components";
import Link from "next/link";
import {wrapper} from "@store_toolkit/store";
import _getServerSideStaticPageData from "@store_toolkit/_storeVariables/_getServerSideStaticPageData";
import Posts from "@components/pagesIncludes/profile/Posts";
import HeadSetter from "@components/global/commonComponents/HeadSetter/HeadSetter";
import ProfileImage from "@components/pagesIncludes/profile/ProfileImage/ProfileImage";
import {useAppSelector} from "@store_toolkit/hooks";

const PageStyle = styled.div`
  #primary {
    #main {
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
          color: var(--primary-text-color,#fff);
        }
      }

      .profile-posts {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 20px 0;

        .profile-no-posts {
          border: .5px solid var(--primary-text-color,#fff);
          border-radius: 50%;
          width: 150px;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            color: var(--primary-text-color,#fff);
            width: 75px;
            height: 75px;
          }
        }

        .profile-no-posts-title {
          color: var(--primary-text-color,#fff);
        }
      }
    }
  }
`

const Profile = () => {


    const userData = useAppSelector(({user}) => user?.userData)
    const sidebar = useAppSelector(({settings}) => settings?.currentPageSettings?.sidebar);

    return (
        <PageStyle className={`profile-page page-${sidebar || 'no'}-sidebar`} id={'content'}>
            <HeadSetter/>
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
                    <Posts userId={userData?._id}/>
                </main>
            </div>

        </PageStyle>
    );
};


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    await _getServerSideStaticPageData(
        context,
        [
            'profilePageRightSidebar',
            'profilePageLeftSidebar',
            'profile'
        ],
        {
            page: 'profilePage',
            setHeadData: true
        },
        store
    )
    return {
        props: {}
    }
})

export default Profile;
