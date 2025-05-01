'use client';
import React, { FC } from 'react';
import WidgetGroupByPosition from '../WidgetGroupByPosition/WidgetGroupByPosition';
import './WidgetPositionsWrapper.scss';
import { IWidget } from '@repo/typescript-types';

interface IProps{
  widgetsInGroups:{
    [key:string]:IWidget[]
  }
  availablePositions:string[]
  customPages:string[],
  onCloneWidgetHandler:Function
}
const WidgetPositionsWrapper:FC<IProps> = ({widgetsInGroups,availablePositions,customPages,onCloneWidgetHandler}) => {

  return (
    <div id="WidgetPositionsWrapper">
      {availablePositions.map((position: string) => {
        return (
          <WidgetGroupByPosition key={position} widgets={widgetsInGroups?.[position]} position={position} customPages={customPages} onCloneWidgetHandler={onCloneWidgetHandler} />
        );
      })}
    </div>
  );
};

export default WidgetPositionsWrapper;
