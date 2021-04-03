import React from 'react';
import {getFirstLoadData, getMultipleWidgetWithData, getPageData} from "../../_variables/ajaxVariables";
import styled from "styled-components";
import WidgetsRenderer from '../../components/includes/WidgetsRenderer/WidgetsRenderer'
import Error from "../_error";

let StyledDiv = styled.div`${props => props.stylesData ?? ''}`

const page = props => {

    if (props.responseCode !==200){
        return <Error responseCode={props.responseCode} />
    }else  return (
        <StyledDiv className='page main'>
            <WidgetsRenderer
                key='page'
                rendering={true}
                position={props.pageInfo.pageName}
                widgets={(props.widgets || []).filter(widget => widget.data.position === props.pageInfo.pageName)}
            />
        </StyledDiv>
    );
};

export const getServerSideProps = async ({req, query}) => {
    const firstLoadData = await getFirstLoadData(req)
    let responseCode = 200
    const pageData = await getPageData({pageName: query.pageName}, firstLoadData.domainName)
    if (!pageData.data.pageData){
        responseCode = 404
    }
    const pageInfo = pageData.data ? pageData.data.pageData : {}
    const widgetsData = await getMultipleWidgetWithData({widgets: [query.pageName, query.pageName + 'Sidebar']}, firstLoadData.domainName, true, query.pageName)
    const widgets = [...(firstLoadData.widgets ?? []), ...(widgetsData?.data?.widgets ?? [])]
    return {props: {widgets, ...firstLoadData.settings, pageInfo, query, isMobile: Boolean(firstLoadData.isMobile), referer: firstLoadData.referer,responseCode}}
}

export default page;
