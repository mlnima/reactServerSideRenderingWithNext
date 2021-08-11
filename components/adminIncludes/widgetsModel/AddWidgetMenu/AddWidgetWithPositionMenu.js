import React, {useContext, useState} from 'react';
// import {
//     widgetModels,
//     postsSwiperWidgetModel,
//     textWidgetModel,
//     menuWidgetModel,
//     linkToWidgetModel,
//     multipleLinkToWidgetModel,
//     postsWidgetModel,
//     mediaWidgetModel,
//     recentCommentsWidgetModel,
//     searchBarWidgetModel,
//     metaWidgetModel,
//     shoppingCartWidgetModel,
//     logoWidgetModel,
//     authenticationWidgetModel,
//     languageWidgetModel,
//     alphabeticalNumericalRangeWidgetModel,
//     imageSwiperWidgetModel
//
//
// } from './models'
import * as widgetModels from './models'
import {addNewWidget} from '../../../../_variables/ajaxVariables'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import {AppContext} from "../../../../context/AppContext";
import _ from "lodash";



const AddWidgetWithPositionMenu = props => {
    const contextData = useContext(AppContext);
    const [state, setState] = useState({
        open: false
    });

    const [positions,setPositions] = useState([
        'topBar',
        'header',
        'navigation',

        'home',
        'homePageLeftSidebar',
        'homePageRightSidebar',

        'postPageTop',
        'postPageLeftSidebar',
        'postPageBottom',
        'postPageRightSidebar',

        'underPost',

        'postsPageTop',
        'postsPageLeftSidebar',
        'postsPageBottom',
        'postsPageRightSidebar',

        'profilePageTop',
        'profilePageLeftSidebar',
        'profilePageBottom',
        'profilePageRightSidebar',

        'tagsPageTop',
        'tagsPageLeftSidebar',
        'tagsPageBottom',
        'tagsPageRightSidebar',

        'categoriesPageTop',
        'categoriesPageLeftSidebar',
        'categoriesPageBottom',
        'categoriesPageRightSidebar',

        'actorsPageTop',
        'actorsPageLeftSidebar',
        'actorsPageBottom',
        'actorsPageRightSidebar',

        'tagPageTop',
        'tagPageLeftSidebar',
        'tagPageBottom',
        'tagPageRightSidebar',

        'categoryPageTop',
        'categoryLeftSidebar',
        'categoryBottom',
        'categoryRightSidebar',

        'actorPageTop',
        'actorPageLeftSidebar',
        'actorPageBottom',
        'actorPageRightSidebar',

        'footer',

    ])

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
        const widgetModelData = type ==='text' || type ==='textEditor' ? widgetModels.textWidgetModel:
                                type ==='menu'? widgetModels.menuWidgetModel:
                                type ==='linkTo'? widgetModels.linkToWidgetModel:
                                type ==='multipleLinkTo'? widgetModels.multipleLinkToWidgetModel:
                                type ==='posts'? widgetModels.postsWidgetModel:
                                type ==='media'? widgetModels.mediaWidgetModel:
                                type ==='searchBar'? widgetModels.searchBarWidgetModel:
                                type ==='searchButton'? widgetModels.searchBarWidgetModel:
                                type ==='recentComments'? widgetModels.recentCommentsWidgetModel:
                                type ==='meta'? widgetModels.metaWidgetModel:
                                type ==='logo'? widgetModels.logoWidgetModel:
                                type ==='shoppingCart'? widgetModels.shoppingCartWidgetModel:
                                type ==='alphabeticalNumericalRange'? widgetModels.alphabeticalNumericalRangeWidgetModel:
                                type ==='language'? widgetModels.languageWidgetModel:
                                type ==='alphabeticalNumericalRange'? widgetModels.authenticationWidgetModel:
                                type ==='imageSwiper'? widgetModels.imageSwiperWidgetModel:
                                type ==='postsSwiper'? widgetModels.postsSwiperWidgetModel:
                                 widgetModels;

        const widgetsInSamePosition = contextData.widgetsSettings.widgets.filter(w=>w?.data?.position === position)
        let dataToSave = {
            ...widgetModelData,
            position,
            type,
            widgetIndex:widgetsInSamePosition.length + 1,
        };

        //console.log(widgetsInSamePosition)
        addNewWidget({
            data: dataToSave
        }).then(() => {
            props.getAndSetWidgetsData()
        }).then(() => {
            props.getAndSetData()
        }).catch(err => {
            console.log(err)
        })
    }

    const renderPositions = positions.map(position=>{
        return(
            <button key={_.uniqueId('position_')} className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(position, props.type)}>{convertVariableNameToName(position)}</button>
        )
    })


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

                    {renderPositions}
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


