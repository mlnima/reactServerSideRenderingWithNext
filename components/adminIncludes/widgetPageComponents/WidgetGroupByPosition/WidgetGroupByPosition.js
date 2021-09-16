import React,{useState} from 'react';
import {convertVariableNameToName} from "../../../../_variables/_variables";
import WidgetModel from "../../widgetsModel/WidgetModel/WidgetModel";
import _ from "lodash";
import styled from "styled-components";
const WidgetGroupByPositionStyledDiv = styled.div`
  background-color: transparent;
  width: 100%;
  position: initial;
  margin: 5px;
  
  .widgetAdminPanelItemHeader{
    height:50px ;
    margin: 0;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: large;
  }
  @media only screen and (min-width: 768px) {
      width: 450px;
      position: relative;
  }
`
const WidgetGroupByPosition = props => {
    const renderWidgets = props.widgets.map(widget => {
        const dataWithIndex = {
            data: {
                ...widget.data,
                widgetIndex: widget?.data?.widgetIndex ? widget.data.widgetIndex : props.widgetsInGroupByPosition.indexOf(widget)
            }
        }
        const widgetData = {...widget, ...dataWithIndex}
        return (
            <WidgetModel
                key={_.uniqueId('id_')}
                widgetId={widgetData._id}
                data={widgetData.data}
                customPages={props.customPages}
                getAndSetWidgetsData={props.getAndSetWidgetsData}
                translationLanguages={props.siteIdentity.translationLanguages || []}
            />
        )
    })
    return (
        <WidgetGroupByPositionStyledDiv className='widgetAdminPanelItem'>
            <p className='widgetAdminPanelItemHeader'>{convertVariableNameToName(props.position)}</p>
            {renderWidgets}
        </WidgetGroupByPositionStyledDiv>
    );
};
export default WidgetGroupByPosition;
