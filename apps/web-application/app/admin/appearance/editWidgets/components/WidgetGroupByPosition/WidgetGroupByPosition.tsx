'use client';
import React, { FC } from 'react';
import { convertVariableNameToName } from '@repo/utils/dist/src';
import WidgetModel from '../WidgetModel/WidgetModel';
import './WidgetGroupByPosition.scss';
import { useSearchParams } from 'next/navigation';
import { IWidget } from '@repo/typescript-types';

interface IProps {
  position: string;
  widgets: IWidget[];
  customPages: string[];
  onCloneWidgetHandler: Function;
}

const WidgetGroupByPosition: FC<IProps> = ({ position, widgets, customPages, onCloneWidgetHandler }) => {
  const searchParams = useSearchParams();
  const paramsPositions = searchParams.getAll('position');

  const sortedWidgets = widgets.sort((a, b) => {
    return a.data.widgetIndex > b.data.widgetIndex ? 1 : -1;
  });

  if (!paramsPositions?.includes(position)) return null;

  return (
    <div className="widgetGroupByPosition widgetAdminPanelItem">
      <div>
        <p className="widgetAdminPanelItemHeader handle">{convertVariableNameToName(position)}</p>
      </div>
      {sortedWidgets?.map((widget) => {
        return <WidgetModel key={widget._id} widget={widget} customPages={customPages} onCloneWidgetHandler={onCloneWidgetHandler} />;
      })}
    </div>
  );
};
export default WidgetGroupByPosition;
