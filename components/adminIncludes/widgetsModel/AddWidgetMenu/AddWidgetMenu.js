import React, { useEffect, useState, useContext, useRef } from 'react';
import { widgetModels } from './models'
import { AppContext } from '../../../../context/AppContext';
import { addNewWidget, getWidgets } from '../../../../_variables/ajaxVariables'
import AddWidgetWithPositionMenu from './AddWidgetWithPositionMenu'

const AddWidgetMenu = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({});
    useEffect(() => {
    }, []);

    const onAddNewWidget = (position, type) => {
        let dataToSave = widgetModels;
        dataToSave.position = position
        dataToSave.type = type
        addNewWidget(widgetModels).then(res => {
            getWidgets('home').then(res => {
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
                })
            })
        })

    }

    return (
        <div className='AddWidgetMenu'>
            <AddWidgetWithPositionMenu type='text' name='Text'/>
            <AddWidgetWithPositionMenu type='posts' name='Posts'/>
            <AddWidgetWithPositionMenu type='recentComments' name='Recent Comments'/>
            <AddWidgetWithPositionMenu type='search' name='Search'/>
            <AddWidgetWithPositionMenu type='tagsCloud' name='Tags Cloud'/>
            <AddWidgetWithPositionMenu type='video' name='Video'/>
            <AddWidgetWithPositionMenu type='navigationMenu' name='Navigation Menu'/>
        </div>
    );
};
export default AddWidgetMenu;


// image recentComments search tagCloud categoriesCloud video navigationMenu
