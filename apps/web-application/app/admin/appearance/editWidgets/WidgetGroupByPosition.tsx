'use client';
import React, { FC } from 'react';
import { convertVariableNameToName } from '@repo/utils';
import WidgetModel from './WidgetModel/WidgetModel';
import { useSelector } from 'react-redux';
import './WidgetGroupByPosition.scss';

interface WidgetGroupByPositionPropTypes {
  filters: string[],
  position: string
}

const WidgetGroupByPosition: FC<WidgetGroupByPositionPropTypes> = ({ filters, position }) => {

  const widgets = useSelector(({ widgets }) => {
      const widgetsToSort = [...(widgets?.adminPanelWidgets?.[position] || [])];
      return [...widgetsToSort]?.sort((a, b) => {
        return (a.data.widgetIndex > b.data.widgetIndex) ? 1 : -1;
      });
    },
  );

  if (!filters.includes(position)) return null;

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
