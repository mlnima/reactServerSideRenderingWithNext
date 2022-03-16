import React, {FC, useRef, useState} from 'react';
import * as widgetModels from './models'
import {adminAddNewWidget, adminGetWidgets} from '@store/adminActions/adminWidgetsActions'
import convertVariableNameToName from "../../../../_variables/util/convertVariableNameToName";
import {uniqueId} from "lodash";
import {useDispatch, useSelector} from 'react-redux';
import styled from "styled-components";
import staticPositions from '../staticPositions';
import Draggable from 'react-draggable';
import {StoreTypes} from "@_variables/TypeScriptTypes/GlobalTypes";


const AddWidgetWithPositionMenuStyledDiv = styled.div`
  position: relative;
  width: 320px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;

  .btn {
    width: 100%;
  }

  .AddWidgetWithPositionMenuPositions {
    position: absolute;
    width: 320px;
    top: 35px;
    z-index: 1;
    background-color: var(--admin-darkcolor70);
    display: grid;
    grid-template-columns: 1fr;

    .btn {
      width: 100%;
    }
  }
`

interface AddWidgetWithPositionMenuPropType{
    type:string,
    name:string
}

const AddWidgetWithPositionMenu :FC<AddWidgetWithPositionMenuPropType> = ({type,name}) => {

    const adminPanelWidgets = useSelector(({adminPanelWidgets}:StoreTypes) => adminPanelWidgets?.adminPanelWidgets)


    const refToElement = useRef(null)
    const widgets = useSelector((store:StoreTypes) => store?.widgets.widgets)
    const customPages = useSelector((store:StoreTypes) => store?.adminPanelGlobalState?.customPages)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)

    const onAddNewWidget = (position:string, type:string) => {
        const widgetModelData = type === 'text' || type === 'textEditor' ? widgetModels.textWidgetModel :
            type === 'menu' ? widgetModels.menuWidgetModel :
                type === 'linkTo' ? widgetModels.linkToWidgetModel :
                    type === 'multipleLinkTo' ? widgetModels.multipleLinkToWidgetModel :
                        type === 'posts' ? widgetModels.postsWidgetModel :
                            type === 'media' ? widgetModels.mediaWidgetModel :
                                type === 'searchBar' ? widgetModels.searchBarWidgetModel :
                                    type === 'searchButton' ? widgetModels.searchBarWidgetModel :
                                        type === 'recentComments' ? widgetModels.recentCommentsWidgetModel :
                                            type === 'meta' ? widgetModels.metaWidgetModel :
                                                type === 'logo' ? widgetModels.logoWidgetModel :
                                                    type === 'shoppingCart' ? widgetModels.shoppingCartWidgetModel :
                                                        type === 'alphabeticalNumericalRange' ? widgetModels.alphabeticalNumericalRangeWidgetModel :
                                                            type === 'language' ? widgetModels.languageWidgetModel :
                                                                type === 'alphabeticalNumericalRange' ? widgetModels.authenticationWidgetModel :
                                                                    // type ==='imageSwiper'? widgetModels.imageSwiperWidgetModel:
                                                                    // type ==='postsSwiper'? widgetModels.postsSwiperWidgetModel:
                                                                    type === 'postsSlider' ? widgetModels.postsWidgetModel :
                                                                        widgetModels;

        const highestIndexInTheSamePosition = Math.max(...(adminPanelWidgets?.[position] || []).map(widget => widget?.data?.widgetIndex), 0)

        let dataToSave = {
            ...widgetModelData,
            position,
            type,
            widgetIndex: highestIndexInTheSamePosition + 1,
        };
        //@ts-ignore
        dispatch(adminAddNewWidget(dataToSave))
        setTimeout(()=>dispatch(adminGetWidgets()),1000)
        setOpen(false)

    }

    const renderPositions = staticPositions.sort((a, b) => a > b ? 1 : -1).map(position => {
        return (

            <button key={uniqueId('position_')}
                    className='btn btn-info'
                    onClick={() => onAddNewWidget(position, type)}
                    onMouseEnter={onIncreaseZIndexHandler}
            >
                {convertVariableNameToName(position)}
            </button>

        )
    })


    const renderCustomPagesPosition = customPages.map((customPage, index) => {
        return (
            <React.Fragment key={index}>
                <button className='btn btn-info' onClick={() => onAddNewWidget(customPage, type)}>{convertVariableNameToName(customPage)}</button>
                <button className='btn btn-info' onClick={() => onAddNewWidget(customPage + 'LeftSidebar', type)}>{convertVariableNameToName(customPage) + ' Left Sidebar'}</button>
                <button className='btn btn-info' onClick={() => onAddNewWidget(customPage + 'RightSidebar', type)}>{convertVariableNameToName(customPage) + ' Right Sidebar'}</button>
            </React.Fragment>
        )
    })

    const onIncreaseZIndexHandler = () => {
        if (refToElement.current) {
            refToElement.current.style.zIndex = 10
        }
    }
    const onReduceZIndexHandler = () => {
        // if (refToElement.current){
        //     refToElement.current.style.zIndex = 'initial'
        // }
    }

    return (
        <Draggable handle=".AddWidgetWithPositionMenu">
            <AddWidgetWithPositionMenuStyledDiv ref={refToElement}
                                                className='AddWidgetWithPositionMenu'
                                                onClickCapture={onIncreaseZIndexHandler}
                                                onMouseOut={onReduceZIndexHandler}
            >
                <button className='btn btn-info' onClick={() => open ? setOpen(false) : setOpen(true)}>
                    {name}
                </button>
                {open ?
                    <div className="AddWidgetWithPositionMenuPositions">
                        {renderPositions}
                        {renderCustomPagesPosition}
                    </div>
                    : null
                }
            </AddWidgetWithPositionMenuStyledDiv>
        </Draggable>
    );

};
export default AddWidgetWithPositionMenu;


