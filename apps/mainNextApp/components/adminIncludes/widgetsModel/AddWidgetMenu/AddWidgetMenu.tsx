import React, {FC} from 'react';
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'
import WidgetImporter from "./WidgetImporter/WidgetImporter";
import WidgetExporter from "./WidgetExporter/WidgetExporter";
import {convertVariableNameToName} from "custom-util";
import {widgetsTypes} from "data-structures";

import styled from "styled-components";

const AddWidgetMenuStyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  .add-widget-buttons{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

  }
  .import-export{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .export-widgets{
      margin: 5px 20px;
    }
    .import-widgets{
      margin: 5px 20px;
    }
  }
`

const AddWidgetMenu : FC = () => {

    return (
        <AddWidgetMenuStyledDiv className='add-export-widgets'>
            <div className='import-export'>
                <WidgetImporter/>
                <WidgetExporter/>
            </div>
            <div className='add-widget-buttons'>
                {widgetsTypes.map((type :string,index:number)=>{
                    return <AddWidgetWithPositionMenu key={index} type={type} name={convertVariableNameToName(type)}/>
                })}
            </div>
        </AddWidgetMenuStyledDiv>
    );
};
export default AddWidgetMenu;

