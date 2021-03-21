import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import { getAbsolutePath } from '../../_variables/_variables'
import { getMultipleSetting, getMultipleWidgetWithData } from '../../_variables/ajaxVariables'
import { AppContext } from '../../context/AppContext'
import ProfileCoverImage from '../../components/includes/MyProfileComponents/ProfileCoverImage/ProfileCoverImage'
import ProfileNavigation from '../../components/includes/MyProfileComponents/ProfileNavigation/ProfileNavigation'
import ProfileComponentsRenderer from '../../components/includes/MyProfileComponents/ProfileComponentsRenderer/ProfileComponentsRenderer'
import MyProfileInfo from '../../components/includes/MyProfileComponents/MyProfileInfo/MyProfileInfo'

const Profile = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        activeTab:'MyProfileInfo'
    });

    return (
        <AppLayout { ...props }>
            <div className='profile-page main'>
                <ProfileCoverImage/>
                <ProfileNavigation state={state} setState={setState}/>
                <ProfileComponentsRenderer activeComponent={state.activeTab}/>
            </div>
        </AppLayout>
    );
};

export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let settings;
    let widgets;
    const widgetsData = await getMultipleWidgetWithData({ widgets: [ 'footer', 'header','topBar','navigation' ] }, domainName, true, 'profilePage')
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, domainName, true, 'profilePage')

    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    settings = settingsData.data.settings ? settingsData.data.settings : []
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
    return {props:{ query, ...settings, widgets,isMobile: Boolean(isMobile) }}
}
export default Profile;
