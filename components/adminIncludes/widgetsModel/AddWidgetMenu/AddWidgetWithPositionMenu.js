import React, { useState} from 'react';
import * as widgetModels from './models'
import {addNewWidget} from '../../../../store/actions/widgetsActions'
import {convertVariableNameToName} from '../../../../_variables/_variables'
import _ from "lodash";
import {useDispatch, useSelector} from 'react-redux';
import styled from "styled-components";
import staticPosition from '../staticPosition';

const AddWidgetWithPositionMenuStyledDiv = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  
  .positionsOpener {
    justify-self: stretch;
    width: 80%;
    background-color: var(--admin-darkcolor70);
    color: var(--admin-text-color);
    border: none;
  }
  .AddWidgetWithPositionMenuPositions {
    position: absolute;
    z-index: 1;
    background-color: var(--admin-darkcolor70);
    display: grid;
    grid-template-columns: 1fr;
    .AddWidgetWithPositionMenuPositionsBtn {
      padding: 2px;
    }
  }
  
`

const AddWidgetWithPositionMenu = props => {
    const widgets = useSelector(state => state.widgets.widgets)
    const customPages = useSelector(state => state.adminPanelGlobalState?.customPages)
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false)

    const [positions,setPositions] = useState(()=>staticPosition)



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

        const widgetsInTheSamePosition = widgets.filter(widget=>widget?.data?.position === position)
        const highestIndexInTheSamePosition = Math.max(...widgetsInTheSamePosition.map(widget => widget?.data?.widgetIndex), 0)

        let dataToSave = {
            ...widgetModelData,
            position,
            type,
            widgetIndex:highestIndexInTheSamePosition + 1,
        };
        dispatch(addNewWidget(dataToSave))
        setOpen(false)

    }

    const renderPositions = staticPosition.map(position=>{
        return(
            <button key={_.uniqueId('position_')}
                    className='AddWidgetWithPositionMenuPositionsBtn'
                    onClick={() => onAddNewWidget(position, props.type)}
            >
                {convertVariableNameToName(position)}
            </button>
        )
    })


    const renderCustomPagesPosition = customPages.map(customPage=>{
       return(
           <React.Fragment key={_.uniqueId('id_')}>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage, props.type)}>{convertVariableNameToName(customPage)}</button>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage+'LeftSidebar', props.type)}>{convertVariableNameToName(customPage)+' Left Sidebar'}</button>
               <button className='AddWidgetWithPositionMenuPositionsBtn' onClick={() => onAddNewWidget(customPage+'RightSidebar', props.type)}>{convertVariableNameToName(customPage)+' Right Sidebar'}</button>
           </React.Fragment>
       )
   })

    return (
        <AddWidgetWithPositionMenuStyledDiv className='AddWidgetWithPositionMenu'>
            <button className='positionsOpener' onClick={() => open ? setOpen(false) : setOpen(true)}>{props.name}</button>
            {open ?
                <div className="AddWidgetWithPositionMenuPositions">
                    {renderPositions}
                    {renderCustomPagesPosition}
                </div>
                :null
            }
        </AddWidgetWithPositionMenuStyledDiv>
    );

};
export default AddWidgetWithPositionMenu;


