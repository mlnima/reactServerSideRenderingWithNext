import React, {useContext, useState} from 'react';
import {
    widgetModels,
    postsSwiperWidgetModel,
    textWidgetModel,
    menuWidgetModel,
    linkToWidgetModel,
    multipleLinkToWidgetModel,
    postsWidgetModel,
    mediaWidgetModel,
    recentCommentsWidgetModel,
    searchBarWidgetModel,
    metaWidgetModel,
    shoppingCartWidgetModel,
    logoWidgetModel,
    authenticationWidgetModel,
    languageWidgetModel,
    alphabeticalNumericalRangeWidgetModel,
    imageSwiperWidgetModel


} from './models'
import {addNewWidget} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import {AppContext} from "../../../../context/AppContext";
import _ from "lodash";



const AddWidgetWithPositionMenu = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        open: false
    });

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
        const widgetModelData = type ==='text' || type ==='textEditor' ? textWidgetModel:
                                type ==='menu'? menuWidgetModel:
                                type ==='linkTo'? linkToWidgetModel:
                                type ==='multipleLinkTo'? multipleLinkToWidgetModel:
                                type ==='posts'? postsWidgetModel:
                                type ==='media'? mediaWidgetModel:
                                type ==='searchBar'? searchBarWidgetModel:
                                type ==='searchButton'? searchBarWidgetModel:
                                type ==='recentComments'? recentCommentsWidgetModel:
                                type ==='meta'? metaWidgetModel:
                                type ==='logo'? logoWidgetModel:
                                type ==='shoppingCart'? shoppingCartWidgetModel:
                                type ==='alphabeticalNumericalRange'? alphabeticalNumericalRangeWidgetModel:
                                type ==='language'? languageWidgetModel:
                                type ==='alphabeticalNumericalRange'? authenticationWidgetModel:
                                type ==='imageSwiper'? imageSwiperWidgetModel:
                                type ==='postsSwiper'? postsSwiperWidgetModel:
                                 widgetModels
        let dataToSave = {
            ...widgetModelData,
            position,
            type,
            widgetIndex:contextData.widgetsSettings.widgets.filter(w=>w.position === position).length + 1,
        };

        addNewWidget({
            data: dataToSave
        }).then(() => {
        }).then(() => {
            props.getAndSetData()
        }).catch(err => {
            console.log(err)
        })
    }
    const renderCustomPagesPosition = props.customPages.map(customPage=>{
       return(
           <React.Fragment key={_.uniqueId('id_')}>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage, props.type)}>{convertVariableNameToName(customPage)}</button>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage+'LeftSidebar', props.type)}>{convertVariableNameToName(customPage)+' Left Sidebar'}</button>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage+'RightSidebar', props.type)}>{convertVariableNameToName(customPage)+' Right Sidebar'}</button>
           </React.Fragment>
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

                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('profilePageRightSidebar', props.type)}>Meta Page Left Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('profilePageLeftSidebar', props.type)}>Meta Page Right Sidebar</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('profilePage', props.type)}>Meta Page Right Sidebar</button>

                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('underPost', props.type)}>Under the Post</button>
                    <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget('footer', props.type)}>Footer</button>
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


