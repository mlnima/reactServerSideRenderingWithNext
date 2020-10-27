import React, {useEffect, useState, useContext, useRef} from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getMultipleSetting, getMultipleWidgetWithData, getPageData} from "../../_variables/ajaxVariables";
import {getAbsolutePath} from '../../_variables/_variables'
import dataDecoder from "../../server/tools/dataDecoder";
import SiteSettingSetter from "../../components/includes/SiteSettingsSetter/SiteSettingsSetter";
import {Sidebar} from '../../components/includes/Sidebar/Sidebar'
import styled from "styled-components";
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'

let StyledDiv = styled.div`${props => props.stylesData}`
const page = props => {
    const [state, setState] = useState({});
    useEffect(() => {
        console.log(props)
    }, [props]);

    return (
        <AppLayout>
            <SiteSettingSetter {...props}/>
            <StyledDiv  className={props.pageInfo.sidebar ? 'post withSidebar' : 'post withOutSidebar'}>

                <div className="main">
                    <WidgetsRenderer widgets={props.widgets} position={props.pageInfo.pageName}/>
                </div>
                <Sidebar key={props.pageInfo.pageName + 'Sidebar'} isActive={props.pageInfo.sidebar} widgets={props.widgets} position={props.pageInfo.pageName + 'Sidebar'}/>

            </StyledDiv>
        </AppLayout>
    );
};


page.getInitialProps = async ({pathname, query, req, res, err}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    const requestBody = {
        _id: query.pageName
    };
    let pageInfo;
    let widgets;
    let settings;
    const pageData = await getPageData({pageName: query.pageName}, domainName)
    pageInfo = pageData.data ? pageData.data.pageData : {}
    const widgetsData = await getMultipleWidgetWithData({widgets: [query.pageName, query.pageName + 'Sidebar', 'footer', 'header', 'underPost', 'topBar', 'navigation']}, domainName, true, query.pageName)
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, query.pageName)
    settings = settingsData.data.settings ? dataDecoder(settingsData.data.settings).finalObject : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []

    return {pageInfo, query, widgets, ...settings}
}
export default page;
