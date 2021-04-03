import React, {useState} from 'react';

import {getFirstLoadData} from '../../_variables/ajaxVariables'
import ProfileCoverImage from '../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import ProfileComponentsRenderer from '../../components/includes/MyProfileComponents/ProfileComponentsRenderer/ProfileComponentsRenderer'
import MyProfileInfo from '../../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo'

const Profile = props => {
    const [ state, setState ] = useState({
        activeTab:'MyProfileInfo'
    });

    return (
            <div className='profile-page main'>
                <ProfileCoverImage/>
                <ProfileNavigation state={state} setState={setState}/>
                <ProfileComponentsRenderer activeComponent={state.activeTab}/>
            </div>
    );
};

export const getServerSideProps = async ({req,query}) => {
    const firstLoadData = await getFirstLoadData(req)
    return {props:{widgets:firstLoadData.widgets,  ...firstLoadData.settings, isMobile: Boolean(firstLoadData.isMobile),query }}
}
export default Profile;
