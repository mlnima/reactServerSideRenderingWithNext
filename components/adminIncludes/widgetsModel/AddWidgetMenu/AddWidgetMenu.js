import React, { useEffect, useState, useContext, useRef } from 'react';
import { widgetModels } from './models'
import { AppContext } from '../../../../context/AppContext';
import { addNewWidget, getWidgets } from '../../../../_variables/ajaxVariables'

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
            <button onClick={ () => onAddNewWidget('home', 'text') }>Add Widget To Home</button>
            <button onClick={ () => onAddNewWidget('homePageSidebar', 'text') }>Add Widget To Home Page Sidebar</button>
            <button onClick={ () => onAddNewWidget('postPageSidebar', 'text') }>Add Widget To Post Page Sidebar</button>
            <button onClick={ () => onAddNewWidget('postsPageSidebar', 'text') }>Add Widget To Posts Page Sidebar</button>
            <button onClick={ () => onAddNewWidget('tagsPageSidebar', 'text') }>Add Widget To Tags Page Sidebar</button>
            <button onClick={ () => onAddNewWidget('categoriesPageSidebar', 'text') }>Add Widget To Categories Page Sidebar</button>
            <button onClick={ () => onAddNewWidget('actorsPageSidebar', 'text') }>Add Widget To Actors Page Sidebar</button>
            <button onClick={ () => onAddNewWidget('footer', 'text') }>Add Widget To Footer</button>
        </div>
    );
};
export default AddWidgetMenu;
