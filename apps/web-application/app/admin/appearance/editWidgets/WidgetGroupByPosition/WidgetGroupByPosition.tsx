'use client';
import React, { FC } from 'react';
import { convertVariableNameToName } from '@repo/utils';
import WidgetModel from '../WidgetModel/WidgetModel';
import './WidgetGroupByPosition.scss';
import {  useSearchParams } from 'next/navigation';
import { useAppSelector } from '@storeDashboard//hooks';

interface WidgetGroupByPositionPropTypes {
  position: string
}

const WidgetGroupByPosition: FC<WidgetGroupByPositionPropTypes> = ({ position }) => {
  const searchParams = useSearchParams();
  const paramsPositions = searchParams.getAll('position');

  const widgets = useAppSelector(({ widgets }) => {
      const widgetsToSort = [...(widgets?.adminPanelWidgets?.[position] || [])];
      return [...widgetsToSort]?.sort((a, b) => {
        return (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1;
      });
    },
  );

  if (!paramsPositions?.includes(position)) return null;

  return (
    <div className="widgetGroupByPosition widgetAdminPanelItem">
      <div>
        <p className="widgetAdminPanelItemHeader handle">{convertVariableNameToName(position)}</p>
      </div>
      {widgets?.map((widget) => {
        return <WidgetModel key={widget._id} widget={widget} />;
      })}
    </div>
  );
};
export default WidgetGroupByPosition;
