import React, { useEffect, useState, useContext } from 'react';
import './AddWidgetWithPositionMenu.scss'
import { widgetModels } from './models'
import { addNewWidget, getWidgets } from '../../../../_variables/ajaxVariables'
import { AppContext } from '../../../../context/AppContext'

const AddWidgetWithPositionMenu = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        open:false
    });
    useEffect(() => {
    }, []);

    const onOpenHandler =()=>{
        state.open?setState({
            ...state,
            open: false
        }):setState({
            ...state,
            open: true
        })
    }

    const onAddNewWidget = (position, type) => {
        let dataToSave = widgetModels;
        dataToSave.position = position
        dataToSave.type = type
        addNewWidget(widgetModels).then(() => {
            getWidgets('home',false,window.location.origin).then(res => {
                contextData.dispatchWidgetsSettings({
                    widgets: [ ...res.data.widgets ]
                })
            })
        }).catch(err=>{
            console.log( err)
        })
    }


    if (state.open){
        return (
            <div className='AddWidgetWithPositionMenu'>
                <button className='positionsOpener' onClick={()=>onOpenHandler()}>{props.name}</button>
                <div className="AddWidgetWithPositionMenuPositions">
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('home', props.type) }>Home Page</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('homePageSidebar', props.type) }>Home Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('postPageSidebar', props.type) }>Post Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('postsPageSidebar', props.type) }>Posts Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('tagsPageSidebar', props.type) }>Tags Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('categoriesPageSidebar', props.type) }>Categories Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('actorsPageSidebar', props.type) }>Actors Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('footer', props.type) }>Footer</button>
                </div>
            </div>
        );
    }else {
        return (
            <div className='AddWidgetWithPositionMenu'>
                <button className='positionsOpener' onClick={()=>onOpenHandler()}>{props.name}</button>
            </div>
        );
    }


};
export default AddWidgetWithPositionMenu;
