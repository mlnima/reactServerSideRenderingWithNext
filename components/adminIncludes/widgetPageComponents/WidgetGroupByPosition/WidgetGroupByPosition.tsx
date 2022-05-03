import {FC} from 'react';
import convertVariableNameToName from "../../../../_variables/util/convertVariableNameToName";
import WidgetModel from "../../widgetsModel/WidgetModel/WidgetModel";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Draggable from 'react-draggable';
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";

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
    width: 650px ;
    position: relative;
    .widget-model {
      width: 650px;
    
    }
  }
  @media only screen and (min-width: 1024px) {
    max-width: 50vw;
    .widget-model {
      max-width: 50vw;
    }
  }
`

interface WidgetGroupByPositionPropTypes {
    filters: string[],
    position: string
}

const WidgetGroupByPosition: FC<WidgetGroupByPositionPropTypes> = ({filters, position}) => {

    const widgets = useSelector(
        ({adminPanelWidgets}: StoreTypes) => adminPanelWidgets?.adminPanelWidgets?.[position]
        ?.sort((a, b) => (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1)
    )

    if (filters.includes(position)) {
        return (
            <Draggable handle={'.widgetAdminPanelItemHeader'}>
                <WidgetGroupByPositionStyledDiv className='widgetAdminPanelItem'>

                    <p className='widgetAdminPanelItemHeader'>{convertVariableNameToName(position)}</p>

                    {widgets?.map((widget) => {
                        return  <WidgetModel key={widget._id} widget={widget}/>
                    })}

                </WidgetGroupByPositionStyledDiv>
            </Draggable>
        );
    } else return null

};
export default WidgetGroupByPosition;
