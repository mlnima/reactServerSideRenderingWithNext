import React, { useEffect, useState, useContext, useRef } from 'react';
import {models} from './models'
import { AppContext } from '../../../../context/AppContext'

const AddWidgetMenu = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onAddNewWidget = (e) => {
        const type = [e.target.name]
        contextData.dispatchWidgetsSettings(widgetSettings => ({
            ...widgetSettings,
            homeWidgets: [ ...contextData.widgetsSettings.homeWidgets, models[type] ]
        }))
    }

    useEffect(() => {
        console.log(contextData.widgetsSettings)
    }, [ contextData.widgetsSettings ]);

    return (
        <div className='AddWidgetMenu'>
            <button name='video' onClick={ e => onAddNewWidget(e) }>Add Video Widget</button>
        </div>
    );
};
export default AddWidgetMenu;
