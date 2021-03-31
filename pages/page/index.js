import React from 'react';
import AppLayout from "../../components/layouts/AppLayout";
import {getMultipleSetting, getMultipleWidgetWithData, getPageData} from "../../_variables/ajaxVariables";
import {getAbsolutePath} from '../../_variables/_variables'
import styled from "styled-components";
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
let StyledDiv = styled.div`${props => props.stylesData ?? ''}`

const page = props => {

    // return (
    //     <AppLayout
    //         sidebar={props.pageInfo.sidebar}
    //         sidebarPosition={props.pageInfo?.pageName + 'Sidebar'}
    //         design={props.design}
    //         widgets={props.widgets}
    //         identity={props.identity}
    //         eCommerce={props.eCommerce}
    //         referer={props.referer}
    //     >
    //         <StyledDiv className='page main' >
    //                 <WidgetsRenderer
    //                     key='page'
    //                     rendering={true}
    //                     position={props.pageInfo.pageName}
    //                     widgets={(props.widgets || []).filter(widget => widget.data.position === props.pageInfo.pageName)}
    //                 />
    //         </StyledDiv>
    //     </AppLayout>
    // );
    return (
            <StyledDiv className='page main' >
                    <WidgetsRenderer
                        key='page'
                        rendering={true}
                        position={props.pageInfo.pageName}
                        widgets={(props.widgets || []).filter(widget => widget.data.position === props.pageInfo.pageName)}
                    />
            </StyledDiv>

    );
};



export const getServerSideProps = async ({req,query}) => {
    const domainName = req ? await getAbsolutePath(req) : ''
    let pageInfo;
    let widgets;
    let settings;
    const pageData = await getPageData({pageName: query.pageName}, domainName)
    pageInfo = pageData.data ? pageData.data.pageData : {}
    const widgetsData = await getMultipleWidgetWithData({widgets: [query.pageName, query.pageName + 'Sidebar']}, domainName, true, query.pageName)
    const firstLoadWidgetsData = !req.headers.referer ? await getMultipleWidgetWithData({widgets: ['footer', 'header', 'topBar', 'navigation']}, domainName, true, 'firstLoadWidgetsData') :[]
    const settingsData = await getMultipleSetting({settings: ['identity', 'design']}, domainName, true, query.pageName)
    settings = settingsData.data.settings ? settingsData.data.settings : []
    widgets = [...(firstLoadWidgetsData?.data?.widgets ?? []),...(widgetsData?.data?.widgets ?? [])]
   // widgets = widgetsData.data.widgets ? widgetsData.data.widgets : []
    const referer = !!req.headers.referer
    let isMobile = (req
        ? req.headers['user-agent']
        : navigator.userAgent).match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
    return {props:{pageInfo, query,isMobile: Boolean(isMobile), widgets, ...settings,referer}}
}

export default page;
