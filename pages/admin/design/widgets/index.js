import {useEffect, useState} from 'react';
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

  #widget-setting {
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
      //display: grid;
      //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      //grid-gap: 10px;
    }
  }

  @media only screen and (min-width: 768px) {
    #widget-setting {
      h2 {
        justify-self: end;
        width: 98%;
      }

      .widgets {
        //grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
        //display: flex;
        //flex-wrap: wrap;
      }
    }
  }
`

const AdminWidgets = () => {

    const widgets = useSelector(state => state.widgets.widgets)
    const [availablePositions, setAvailablePositions] = useState([])

    useEffect(() => {
        const positions = widgets.map(widgets => widgets?.data?.position)
        setAvailablePositions([...new Set(positions)])
    }, [widgets]);

    return (
        <StyledDiv className='admin-widgets-page'>
            <h1>Widgets Settings</h1>
            <div id='widget-setting'>
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
