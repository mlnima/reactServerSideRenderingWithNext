import React from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getMultipleSetting, getMultipleWidgetWithData, getPageData} from "../../_variables/ajaxVariables";
import {getAbsolutePath} from '../../_variables/_variables'
//import styled from "styled-components";
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
//let StyledDiv = styled.div`${props => props.stylesData || ''}`

const page = props => {

    return (
        <AppLayout {...props} sidebar={props.pageInfo.sidebar} sidebarPosition={props.pageInfo?.pageName + 'Sidebar'}>
            {/*<StyledDiv  >*/}
                    <WidgetsRenderer
                        key='page'
                        rendering={true}
                        position={props.pageInfo.pageName}
                        className='page main'
                        widgets={(props.widgets || []).filter(widget => widget.data.position === props.pageInfo.pageName)}
                    />
            {/*</StyledDiv>*/}
        </AppLayout>
    );
};



export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let pageInfo;
    let widgets;
    let settings;
    const pageData = await getPageData({pageName: query.pageName}, domainName)
    pageInfo = pageData.data ? pageData.data.pageData : {}
    const widgetsData = await getMultipleWidgetWithData({widgets: [query.pageName, query.pageName + 'Sidebar', 'footer', 'header', 'topBar', 'navigation']}, domainName, true, query.pageName)
    const settingsData = await getMultipleSetting({settings: ['identity', 'navigation', 'design']}, domainName, true, query.pageName)
    settings = settingsData.data.settings ? settingsData.data.settings : []
    widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    return {props:{pageInfo, query, widgets, ...settings}}
}

export default page;
