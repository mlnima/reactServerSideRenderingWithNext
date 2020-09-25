import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getAbsolutePath} from "../../_variables/_variables";
import {getMultipleSetting, getMultipleWidgetWithData} from "../../_variables/ajaxVariables";
import dataDecoder from "../../server/tools/dataDecoder";
import contact from "../contact";
import SiteSettingSetter from "../../components/includes/SiteSettingsSetter/SiteSettingsSetter";

const checkout = props => {
    const [state, setState] = useState({});
    useEffect(() => {
    }, []);
    return (
        <AppLayout>
            <SiteSettingSetter  {...props} />
            checkout
        </AppLayout>
    );
};

checkout.getInitialProps = async ({pathname, query, req, asPath}) => {
    const domainName = req ? await getAbsolutePath(req) : '';
    let errorCode = 200
    let settings;
    let widgets;
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, 'tagsPage')
    const widgetsData = await getMultipleWidgetWithData({widgets: [ 'footer', 'header','topBar','navigation']}, domainName, true, 'tagsPage')

    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return {...settings, query, pathname, asPath, widgets}
}



export default checkout;
