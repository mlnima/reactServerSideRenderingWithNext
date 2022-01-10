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
    border-radius: .5rem .5rem 0 0;
  }

  @media only screen and (min-width: 768px) {
    width: ${props=>props?.filter !=='all'? '650px':'650px' } ;

    position: relative;
    .widget-model{
      width:  650px;
    }
  }
`

//     ${props=>props?.filter !=='all'?
//            `
//            display:flex;
//            justify-content:flex-start;
//            `:
//             ''
// }
const WidgetGroupByPosition = props => {
    const widgets = useSelector(store => store?.widgets.widgets)
    const [widgetInThisPosition, setWidgetInThisPosition] = useState([])

    useEffect(() => {
        const filterWidgetForThisPosition = widgets.filter(widgets => widgets?.data?.position === props.position)
        const sortWidgetForThisPosition = filterWidgetForThisPosition.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
        setWidgetInThisPosition(sortWidgetForThisPosition)
    }, [widgets]);

    if (props.filter === props.position || props.filter === 'all' ){
        return (
            <WidgetGroupByPositionStyledDiv filter={props.filter} className='widgetAdminPanelItem'>
                <p className='widgetAdminPanelItemHeader'>{convertVariableNameToName(props.position)}</p>
                {widgetInThisPosition.map((widget) => {
                    return (
                        <WidgetModel key={widget._id} widgetId={widget._id}/>
                    )
                })}
            </WidgetGroupByPositionStyledDiv>
        );
    }else return null

};
export default WidgetGroupByPosition;
