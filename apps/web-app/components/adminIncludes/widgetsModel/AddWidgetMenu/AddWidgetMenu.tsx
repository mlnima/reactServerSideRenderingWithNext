import React, {FC, useEffect, useState} from 'react';
import WidgetImporter from "./WidgetImporter/WidgetImporter";
import WidgetExporter from "./WidgetExporter/WidgetExporter";
import {convertVariableNameToName} from "custom-util";
import {widgetsTypes} from "data-structures";
import {widgetsStaticPositions} from 'data-structures';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useAdminDispatch} from "@store_toolkit/hooks";
import defaultWidgetsData from "@components/adminIncludes/widgetsModel/AddWidgetMenu/defaultWidgetsData";
import {fetchAdminPanelAddNewWidget} from "@store_toolkit/adminReducers/adminWidgetsReducer";

const AddWidgetMenuStyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;


  .add-new-widget-form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }


  .add-widget-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

  }

  .import-export {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    .export-widgets {
      margin: 5px 20px;
    }

    .import-widgets {
      margin: 5px 20px;
    }
  }
`

const AddWidgetMenu: FC = () => {
    const dispatch = useAdminDispatch()
    const customPages = useSelector(({adminPanelGlobalState}: Store) => adminPanelGlobalState?.customPages);
    const adminPanelWidgets = useSelector(({adminPanelWidgets}: Store) => adminPanelWidgets?.adminPanelWidgets);

    const [state, setState] = useState({
        position: 'home',
        type: 'text'
    })

    const onAddNewWidget = (e) => {
        e.preventDefault()
        const highestIndexInTheSamePosition = Math.max(
            ...(adminPanelWidgets?.[state.position] || []).map(widget => widget?.data?.widgetIndex),
            0
        )
       const widgetModelData =  defaultWidgetsData?.[state.type] || {}


        let dataToSave = {
            ...widgetModelData,
            position:state.position,
            type: state.type,
            widgetIndex: highestIndexInTheSamePosition + 1,
        };

        dispatch(fetchAdminPanelAddNewWidget(dataToSave))
    }

    const onChangeHandler = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        console.log(state)
    }, [state]);


    return (
        <AddWidgetMenuStyledDiv className='add-export-widgets'>

            <form className={'add-new-widget-form'} onSubmit={e => onAddNewWidget(e)}>
                <select name={'type'} className={'custom-select'} value={state.type} onChange={(e => onChangeHandler(e))}>
                    {widgetsTypes.map((type: string, index: number) => {
                        return (
                            <option key={index} value={type}>
                                {convertVariableNameToName(type)}
                            </option>
                        )
                    })}
                </select>
                <select name={'position'} className={'custom-select'} value={state.position} onChange={(e => onChangeHandler(e))}>
                    {
                        widgetsStaticPositions.map((position) => {
                            return (
                                <option value={position} key={position}>{convertVariableNameToName(position)}</option>
                            )
                        })
                    }
                    {
                        customPages.map((customPage, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <option value={customPage}>{convertVariableNameToName(customPage)}</option>
                                    <option
                                        value={customPage + 'LeftSidebar'}>{convertVariableNameToName(customPage) + ' Left Sidebar'}</option>
                                    <option
                                        value={customPage + 'RightSidebar'}>{convertVariableNameToName(customPage) + ' Right Sidebar'}</option>
                                </React.Fragment>
                            )
                        })
                    }
                </select>

                <button className={'btn btn-primary'}>Add</button>

            </form>
            <div className='import-export'>
                <WidgetImporter/>
                <WidgetExporter/>
            </div>
        </AddWidgetMenuStyledDiv>
    );
};
export default AddWidgetMenu;

