import React, {useState, useEffect, useContext} from 'react';
import {getFirstLoadData} from '../../_variables/ajaxVariables';
import ProfileCoverImage from '../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage';
import ProfileNavigation from '../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation';
import MyProfileInfo from '../../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo';
import {getSignedInUserData} from "../../_variables/ajaxAuthVariables";
import {AppContext} from "../../context/AppContext";

const Profile = props => {
    const contextData = useContext(AppContext);

    // useEffect(() => {
    //     getSignedInUserData(['coverImage']).then(res => {
    //         contextData.dispatchUserData({
    //             ...contextData.userData,
    //             ...res.data.userData
    //         });
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }, []);

    return (
        <div className='profile-page main'>
            <style jsx>{`
                .main{
                    max-width: 940px;
                    margin: auto;
                }
            `}</style>
            <ProfileCoverImage/>
            <ProfileNavigation/>
            <MyProfileInfo/>
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const firstLoadData = await getFirstLoadData(context.req, ['profilePageRightSidebar,profilePageLeftSidebar', 'profilePage'], 'profilePage')
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
