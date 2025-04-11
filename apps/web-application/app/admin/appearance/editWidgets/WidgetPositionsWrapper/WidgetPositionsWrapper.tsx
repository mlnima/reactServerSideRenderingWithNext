'use client';
import React from 'react';
import { useAppSelector } from '@storeDashboard//hooks';
import WidgetGroupByPosition from '../WidgetGroupByPosition/WidgetGroupByPosition';
import './WidgetPositionsWrapper.scss';

const WidgetPositionsWrapper = () => {

  const availablePositions = useAppSelector(({ widgets }) => Object.keys(widgets?.adminPanelWidgets));

  return (
    <div id="WidgetPositionsWrapper">
      {availablePositions.map((position: string) => {
        return (
          <WidgetGroupByPosition key={position} position={position} />
        );
      })}
    </div>
  );
};

export default WidgetPositionsWrapper;
