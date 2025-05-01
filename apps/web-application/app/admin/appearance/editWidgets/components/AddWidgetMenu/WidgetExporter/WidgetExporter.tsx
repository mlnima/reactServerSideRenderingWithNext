// @ts-nocheck
'use client';
import React from 'react';
import { useAppDispatch } from "@store/hooks";
import {  IWidget } from '@repo/typescript-types';

interface IProps{
  widgetsInGroups:{
    [key:string]:IWidget[]
  },
}

const WidgetExporter:FC<IProps> = ({widgetsInGroups}): JSX.Element => {

    const dispatch = useAppDispatch();

    const exportAllWidgets = () => {
        const data = Object.entries(widgetsInGroups).reduce((finalArr : IWidget[], current) => {
            const [position, widgetsOnPosition] = current;
            finalArr = [...finalArr, ...widgetsOnPosition];
            return finalArr;
        }, []);

        let filename = `${performance.now().toLocaleString()}-all-widgets.json`;
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);

            dispatch({ type: 'loading', payload: false });
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            dispatch({ type: 'loading', payload: false });
        }
    };

    return (
        <div className='export-widgets'>
            <button className='btn btn-primary' onClick={() => exportAllWidgets()}>Export All Widgets</button>
        </div>
    );
};

export default WidgetExporter;