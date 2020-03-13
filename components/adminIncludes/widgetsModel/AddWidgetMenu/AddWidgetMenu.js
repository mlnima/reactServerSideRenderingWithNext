import React, { useEffect, useState, useContext, useRef } from 'react';
import {widgetModels} from './models'
import { AppContext } from '../../../../context/AppContext';
import {addNewWidget} from '../../../../_variables/ajaxVariables'

const AddWidgetMenu = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onAddNewWidget = (position,type) => {
        // const type = [e.target.name]
        // contextData.dispatchWidgetsSettings(widgetSettings => ({
        //     ...widgetSettings,
        //     homeWidgets: [ ...contextData.widgetsSettings.homeWidgets, models[type] ]
        // }))
         let dataToSave = widgetModels;
         dataToSave.type = type
         dataToSave.position = position
        addNewWidget(widgetModels).then(res=>{
            console.log( res.data)
        })

    }

    return (
        <div className='AddWidgetMenu'>
            <button  name='video' onClick={ element => onAddNewWidget('home','videoBlocks') }>Add Video Widget to Home</button>
        </div>
    );
};
export default AddWidgetMenu;
