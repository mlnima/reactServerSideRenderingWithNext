import React from 'react';
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'
import WidgetImporter from "./WidgetImporter/WidgetImporter";
import WidgetExporter from "./WidgetExporter/WidgetExporter";
import {convertVariableNameToName} from "../../../../_variables/_variables";

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

const AddWidgetMenu = () => {
        const widgetTypes=[
            'text',
            'textEditor',
            'menu',
            'linkTo',
            'multipleLinkTo',
            'posts',
            'media',
            'recentComments',
            'searchBar',
            'searchButton',
            'meta',
            'metaWithImage',
            'logo',
            'form',
            'shoppingCart',
            'alphabeticalNumericalRange',
            'language',
            'authentication',
            'postsSlider',
            'imageSwiper',
            'postsSwiper',
        ]

        const renderWidgetsTypes = widgetTypes.map((type,index)=>{
                return <AddWidgetWithPositionMenu key={index}
                                                  type={type}
                                                  name={convertVariableNameToName(type)}
                />
        })

    return (
        <AddWidgetMenuStyledDiv className='add-export-widgets'>
            <div className='import-export'>
                <WidgetImporter/>
                <WidgetExporter/>
            </div>
            <div className='add-widget-buttons'>
                {renderWidgetsTypes}
            </div>
        </AddWidgetMenuStyledDiv>
    );
};
export default AddWidgetMenu;

