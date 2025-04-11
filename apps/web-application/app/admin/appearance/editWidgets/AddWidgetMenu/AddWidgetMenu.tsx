'use client';
import React, {useState } from 'react';
import WidgetImporter from './WidgetImporter/WidgetImporter';
import WidgetExporter from './WidgetExporter/WidgetExporter';
import { convertVariableNameToName } from '@repo/utils';
import { widgetsTypes, widgetsStaticPositions } from '@repo/data-structures';
import defaultWidgetsData from './defaultWidgetsData';
import { useAppDispatch } from '@storeDashboard/hooks';
import { createNewWidgetAction } from '@storeDashboard/reducers/widgetsReducer';
import { useAppSelector } from '@storeDashboard//hooks';
import { IWidget } from '@repo/typescript-types';
import './AddWidgetMenu.scss'

const AddWidgetMenu = () => {
  const dispatch = useAppDispatch();
  const customPages = useAppSelector(({ globalState }) => globalState?.customPages);
  const adminPanelWidgets = useAppSelector(({ widgets }) => widgets?.adminPanelWidgets);

  const [state, setState] = useState({
    position: 'home',
    type: 'text',
  });

  const onAddNewWidget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const highestIndexInTheSamePosition = Math.max(
      ...(adminPanelWidgets?.[state.position] || []).map((widget: IWidget) => widget?.data?.widgetIndex),
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
    <div id={'adminAddWidgetMenu'} className="add-export-widgets">
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
          {customPages.map((customPage: string, index: number) => (
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
    </div>
  );
};

export default AddWidgetMenu;