import {useMemo} from 'react';
import AddWidgetMenu from '../../../../components/adminIncludes/widgetsModel/AddWidgetMenu/AddWidgetMenu'
import WidgetGroupByPosition from "../../../../components/adminIncludes/widgetPageComponents/WidgetGroupByPosition/WidgetGroupByPosition";
import styled from "styled-components";
import {useSelector} from "react-redux";

let StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  .widget-setting {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .top-panel {
      width: 100%;
    }
    
    .widgets {
      margin: auto;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }

  @media only screen and (min-width: 768px) {
    .widget-setting {
      h2 {
        justify-self: end;
        width: 98%;
      }
    }
  }
`

const AdminWidgets = () => {

    const widgets = useSelector(state => state.widgets.widgets)
    const availablePositions = useMemo(()=>{
        const positions = widgets.map(widgets => widgets?.data?.position).sort()
        return [...new Set(positions)]
    },[widgets])

    return (
        <StyledDiv className='admin-widgets-page'>
            <h1>Widgets Settings</h1>
            <div class='widget-setting'>
                <h2>Add New Widget</h2>
                <div className="top-panel">
                    <AddWidgetMenu/>
                </div>
                <h2>Widgets:</h2>
                <div className="widgets">
                    {availablePositions.map((position, index) => {
                        return (
                            <WidgetGroupByPosition key={index} position={position} />
                        )
                    })}
                </div>
            </div>
        </StyledDiv>
    );
};

export default AdminWidgets;
