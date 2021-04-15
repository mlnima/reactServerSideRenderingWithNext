import React, {useEffect, useState, useContext} from 'react';
import {widgetModels} from './models'
import {addNewWidget, getMultipleWidgetWithData, getPagesData} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import {AppContext} from '../../../../context/AppContext'


const AddWidgetWithPositionMenu = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        open: false
    });
    const [customPages,setCustomPages] = useState([])

    // useEffect(() => {
    //     getPagesData().then(res=>{
    //         if(res.data){
    //             if(res.data.pages){
    //                 const pagesNames = res.data.pages.map(page=>page.pageName)
    //                 setCustomPages(pagesNames)
    //             }
    //         }
    //     })
    // }, [props]);

    const onOpenHandler = () => {
        state.open ? setState({
            ...state,
            open: false
        }) : setState({
            ...state,
            open: true
        })
    }

    const onAddNewWidget = (position, type) => {
        let dataToSave = widgetModels;
        dataToSave.position = position
        dataToSave.type = type
        addNewWidget({
            data: widgetModels
        }).then(() => {
        }).then(() => {
            props.getAndSetData()
            // getMultipleWidgetWithData({widgets: ['all']}, window.location.origin, false, Date.now()).then(res => {
            //     contextData.dispatchWidgetsSettings({
            //         ...contextData.widgetsSettings,
            //         widgets: [...res.data.widgets]
            //     })
            // })
        }).catch(err => {
            console.log(err)
        })
    }
    const renderCustomPagesPosition = props.customPages.map(customPage=>{
       return(
           <>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage, props.type)}>{convertVariableNameToName(customPage)}</button>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage+'LeftSidebar', props.type)}>{convertVariableNameToName(customPage)+' Left Sidebar'}</button>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage+'RightSidebar', props.type)}>{convertVariableNameToName(customPage)+' Right Sidebar'}</button>
           </>
       )
   })

    if (state.open) {
        return (
            <div className='AddWidgetWithPositionMenu'>
                <button className='positionsOpener' onClick={() => onOpenHandler()}>{props.name}</button>
                <div className="AddWidgetWithPositionMenuPositions">
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('topBar', props.type)}>Top Bar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('header', props.type)}>Header</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('navigation', props.type)}>Navigation</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('home', props.type)}>Home Page</button>

                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('homePageLeftSidebar', props.type)}>Home Page Left Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('homePageRightSidebar', props.type)}>Home Page Right Sidebar</button>

                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('postPageLeftSidebar', props.type)}>Post Page Left Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('postPageRightSidebar', props.type)}>Post Page Right Sidebar</button>


                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('postsPageLeftSidebar', props.type)}>Posts Page Left Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('postsPageRightSidebar', props.type)}>Posts Page Right Sidebar</button>

                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('metaPageLeftSidebar', props.type)}>Meta Page Left Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('metaPageRightSidebar', props.type)}>Meta Page Right Sidebar</button>

                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('underPost', props.type)}>Under the Post</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('footer', props.type)}>Footer</button>
                    <p>CUSTOM PAGES :</p>
                   {renderCustomPagesPosition}
                </div>
            </div>
        );
    } else {
        return (
            <div className='AddWidgetWithPositionMenu'>
                <button className='positionsOpener' onClick={() => onOpenHandler()}>{props.name}</button>
            </div>
        );
    }


};
export default AddWidgetWithPositionMenu;


//
// <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('tagsPageLeftSidebar', props.type)}>Tags Page Left Sidebar</button>
// <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('tagsPageRightSidebar', props.type)}>Tags Page Right Sidebar</button>
//
// <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('categoriesPageLeftSidebar', props.type)}>Categories Page Left Sidebar</button>
// <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('categoriesPageRightSidebar', props.type)}>Categories Page Right Sidebar</button>
//
// <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('actorsPageLeftSidebar', props.type)}>Actors Page Left Sidebar</button>
// <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('actorsPageRightSidebar', props.type)}>Actors Page Right Sidebar</button>