import React, {useState, useEffect} from 'react';
import {convertVariableNameToName} from "../../../../_variables/_variables";
import WidgetModel from "../../widgetsModel/WidgetModel/WidgetModel";
import styled from "styled-components";
import {useSelector} from "react-redux";

const WidgetGroupByPositionStyledDiv = styled.div`
  background-color: transparent;
  width: 100%;
  position: initial;
  margin: 5px;
  .widgetAdminPanelItemHeader {
    height: 50px;
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
    const widgets = useSelector(state => state?.widgets.widgets)
    const [widgetInThisPosition, setWidgetInThisPosition] = useState([])

    useEffect(() => {
        const filterWidgetForThisPosition = widgets.filter(widgets => widgets?.data?.position === props.position)
        const sortWidgetForThisPosition = filterWidgetForThisPosition.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
        setWidgetInThisPosition(sortWidgetForThisPosition)
    }, [widgets]);

    return (
        <WidgetGroupByPositionStyledDiv className='widgetAdminPanelItem'>
            <p className='widgetAdminPanelItemHeader'>{convertVariableNameToName(props.position)}</p>
            {widgetInThisPosition.map((widget) => {
                return (
                    <WidgetModel key={widget._id} widgetId={widget._id} />
                )
            })}
        </WidgetGroupByPositionStyledDiv>
    );
};
export default WidgetGroupByPosition;
