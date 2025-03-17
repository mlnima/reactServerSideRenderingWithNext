'use client';

import React, { useState } from 'react';
import WidgetImporter from './WidgetImporter/WidgetImporter';
import WidgetExporter from './WidgetExporter/WidgetExporter';
import { convertVariableNameToName } from '@repo/utils';
import { widgetsTypes, widgetsStaticPositions } from '@repo/data-structures';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { DashboardStore } from '@repo/typescript-types';
import defaultWidgetsData from './defaultWidgetsData';
import { useAppDispatch } from '@storeDashboard/hooks';
import { createNewWidgetAction } from '@storeDashboard/reducers/widgetsReducer';

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
`;

const AddWidgetMenu = () => {
  const dispatch = useAppDispatch();
  const customPages = useSelector(({ globalState }: DashboardStore) => globalState?.customPages);
  const adminPanelWidgets = useSelector(({ widgets }: DashboardStore) => widgets?.adminPanelWidgets);

  const [state, setState] = useState({
    position: 'home',
    type: 'text',
  });

  const onAddNewWidget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const highestIndexInTheSamePosition = Math.max(
      ...(adminPanelWidgets?.[state.position] || []).map(widget => widget?.data?.widgetIndex),
      0,
    );
    // @ts-expect-error: its fine
    const widgetModelData = defaultWidgetsData?.[state.type] || {};

    let dataToSave = {
      ...widgetModelData,
      position: state.position,
      type: state.type,
      widgetIndex: highestIndexInTheSamePosition + 1,
    };

    dispatch(createNewWidgetAction(dataToSave));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AddWidgetMenuStyledDiv className="add-export-widgets">
      <form className={'add-new-widget-form'} onSubmit={onAddNewWidget}>
        <select name={'type'} className={'primarySelect'} value={state.type} onChange={onChangeHandler}>
          {widgetsTypes.map((type: string, index: number) => (
            <option key={index} value={type}>{convertVariableNameToName(type)}</option>
          ))}
        </select>
        <select name={'position'} className={'primarySelect'} value={state.position} onChange={onChangeHandler}>
          {widgetsStaticPositions.map((position) => (
            <option value={position} key={position}>{convertVariableNameToName(position)}</option>
          ))}
          {customPages.map((customPage, index) => (
            <React.Fragment key={index}>
              <option value={customPage}>{convertVariableNameToName(customPage)}</option>
              <option
                value={customPage + 'LeftSidebar'}>{convertVariableNameToName(customPage) + ' Left Sidebar'}</option>
              <option
                value={customPage + 'RightSidebar'}>{convertVariableNameToName(customPage) + ' Right Sidebar'}</option>
            </React.Fragment>
          ))}
        </select>
        <button className={'btn btn-primary'}>Add</button>
      </form>
      <div className="import-export">
        <WidgetImporter />
        <WidgetExporter />
      </div>
    </AddWidgetMenuStyledDiv>
  );
};

export default AddWidgetMenu;