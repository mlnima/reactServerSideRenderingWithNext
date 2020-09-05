import React, { useEffect, useState, useContext } from 'react';
import { widgetModels } from './models'
import { addNewWidget, getMultipleWidgetWithData } from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import { AppContext } from '../../../../context/AppContext'

const AddWidgetWithPositionMenu = props => {
    const contextData = useContext(AppContext);
    const [ state, setState ] = useState({
        open:false
    });


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
        addNewWidget({
            data:widgetModels
        }).then(() => {
            getMultipleWidgetWithData({ widgets: [ 'all' ] }, window.location.origin,false,  Date.now()).then(res=>{
                contextData.dispatchWidgetsSettings({
                    ...contextData.widgetsSettings,
                    widgets: [ ...res.data.widgets ]
                })
            })

            //
            // getWidgets('home',false,window.location.origin).then(res => {
            //     contextData.dispatchWidgetsSettings({
            //         widgets: [ ...res.data.widgets ]
            //     })
            // })
        }).catch(err=>{
            console.log( err)
        })
    }


    if (state.open){
        return (
            <div className='AddWidgetWithPositionMenu'>
                <button className='positionsOpener' onClick={()=>onOpenHandler()}>{props.name}</button>
                <div className="AddWidgetWithPositionMenuPositions">
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('topBar', props.type) }>Top Bar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('home', props.type) }>Home Page</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('header', props.type) }>Header</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('dynamicTopBar', props.type) }>Dynamic Top Bar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('dynamicNavigation', props.type) }>Dynamic Navigation</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('homePageSidebar', props.type) }>Home Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('postPageSidebar', props.type) }>Post Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('underPost', props.type) }>Under the Post</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('postsPageSidebar', props.type) }>Posts Page Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={ () => onAddNewWidget('metaPageSidebar', props.type) }>Meta Page Sidebar</button>
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
