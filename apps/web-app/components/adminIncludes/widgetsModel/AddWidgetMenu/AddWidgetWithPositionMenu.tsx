import React, {FC, useRef, useState} from 'react';
import * as defaultWidgetsData from './defaultWidgetsData'
import {convertVariableNameToName} from "custom-util";
import {useSelector} from 'react-redux';
import styled from "styled-components";
import {widgetsStaticPositions} from 'data-structures';
import Draggable from 'react-draggable';
import {fetchAdminPanelAddNewWidget} from "@store_toolkit/adminReducers/adminWidgetsReducer";
import {useAdminDispatch} from "@store_toolkit/hooks";
import {Store} from "typescript-types";
import dynamic from "next/dynamic";

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
      z-index: 10;
    }
  }
`

interface AddWidgetWithPositionMenuPropType {
    type: string,
    name: string
}

const AddWidgetWithPositionMenu: FC<AddWidgetWithPositionMenuPropType> = ({type, name}) => {

    const adminPanelWidgets = useSelector(({adminPanelWidgets}: Store) => adminPanelWidgets?.adminPanelWidgets)

    const customPages = useSelector((store: Store) => store?.adminPanelGlobalState?.customPages)

    const dispatch = useAdminDispatch()
    const [open, setOpen] = useState(false)

    const onAddNewWidget = (position: string, type: string) => {
        const widgetModelData = type === 'text' || type === 'textEditor' ? defaultWidgetsData.textWidgetModel :
            type === 'menu' ? defaultWidgetsData.menuWidgetModel :
                type === 'postsSlider' || type === 'imagesSlider' ? defaultWidgetsData.slider :
                    type === 'postsSlider' || type === 'imagesSlider' ? defaultWidgetsData.slider :
                        type === 'linkTo' ? defaultWidgetsData.linkToWidgetModel :
                            type === 'multipleLinkTo' ? defaultWidgetsData.multipleLinkToWidgetModel :
                                type === 'posts' ? defaultWidgetsData.postsWidgetModel :
                                    type === 'media' ? defaultWidgetsData.mediaWidgetModel :
                                        type === 'searchBar' ? defaultWidgetsData.searchBarWidgetModel :
                                            type === 'searchButton' ? defaultWidgetsData.searchBarWidgetModel :
                                                type === 'recentComments' ? defaultWidgetsData.recentCommentsWidgetModel :
                                                    type === 'meta' ? defaultWidgetsData.metaWidgetModel :
                                                        type === 'logo' ? defaultWidgetsData.logoWidgetModel :
                                                            type === 'shoppingCart' ? defaultWidgetsData.shoppingCartWidgetModel :
                                                                type === 'alphabeticalNumericalRange' ? defaultWidgetsData.alphabeticalNumericalRangeWidgetModel :
                                                                    type === 'language' ? defaultWidgetsData.languageWidgetModel :
                                                                        type === 'alphabeticalNumericalRange' ? defaultWidgetsData.authenticationWidgetModel :
                                                                                type === 'postsSlider' ? defaultWidgetsData.postsWidgetModel :
                                                                                    {};

        const highestIndexInTheSamePosition = Math.max(...(adminPanelWidgets?.[position] || []).map(widget => widget?.data?.widgetIndex), 0)

        let dataToSave = {
            ...widgetModelData,
            position,
            type,
            widgetIndex: highestIndexInTheSamePosition + 1,
        };
        //@ts-ignore
        dispatch(fetchAdminPanelAddNewWidget(dataToSave))
        // setTimeout(()=>dispatch(adminGetWidgets()),1000)
        setOpen(false)

    }

    const onIncreaseZIndexHandler = () => {
        // if (nodeRef.current) {
        //     nodeRef.current.style.zIndex = 10
        // }
    }
    const onReduceZIndexHandler = () => {
        // if (refToElement.current){
        //     refToElement.current.style.zIndex = 'initial'
        // }
    }


    const renderPositions = [...widgetsStaticPositions].sort((a, b) => a > b ? 1 : -1).map(position => {
        return (

            <button key={'position_' + position}
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
                <button className='btn btn-info'
                        onClick={() => onAddNewWidget(customPage, type)}>{convertVariableNameToName(customPage)}</button>
                <button className='btn btn-info'
                        onClick={() => onAddNewWidget(customPage + 'LeftSidebar', type)}>{convertVariableNameToName(customPage) + ' Left Sidebar'}</button>
                <button className='btn btn-info'
                        onClick={() => onAddNewWidget(customPage + 'RightSidebar', type)}>{convertVariableNameToName(customPage) + ' Right Sidebar'}</button>
            </React.Fragment>
        )
    })


    return (
        //@ts-ignore
        <Draggable handle='.handle'>
            <AddWidgetWithPositionMenuStyledDiv className='AddWidgetWithPositionMenu handle'
                                                onClickCapture={onIncreaseZIndexHandler}
                                                onMouseOut={onReduceZIndexHandler}
                // ref={refToElement}
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


