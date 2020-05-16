import React, { useEffect, useState, useContext, useRef } from 'react';
import AppLayout from '../../components/layouts/AppLayout'
import { getAbsolutePath } from '../../_variables/_variables'
import { getMultipleSetting, getMultipleWidgetWithData } from '../../_variables/ajaxVariables'
import dataDecoder from '../../server/tools/dataDecoder'
import SiteSettingSetter from '../../components/includes/SiteSettingsSetter/SiteSettingsSetter'

const Profile = props => {
    const [ state, setState ] = useState({});
    useEffect(() => {
        console.log(props)
    }, [ props ]);
    return (
        <AppLayout>
            <SiteSettingSetter { ...props }/>
            <div className='profile-page'>

            </div>
        </AppLayout>
    );
};
Profile.getInitialProps = async ({ pathname, query, req, res, err }) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let settings;
    let widgets;
    let errorCode = 200
    const widgetsData = await getMultipleWidgetWithData({ widgets: ['footer', 'header' ] }, true, domainName, 'profilePage')
    const settingsData = await getMultipleSetting({ settings: [ 'identity', 'navigation', 'design' ] }, true, domainName, 'profilePage')
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return { query,...settings,widgets }
}

export default Profile;
