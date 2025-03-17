// @ts-nocheck
'use client';

import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from "@storeDashboard/hooks";
import { DashboardStore, IWidget } from '@repo/typescript-types';

const WidgetExporter = (): JSX.Element => {
    const widgets = useSelector(({ widgets }: DashboardStore) => widgets?.adminPanelWidgets);
    const dispatch = useAppDispatch();

    const exportAllWidgets = () => {
        const data = Object.entries(widgets).reduce((finalArr : IWidget[], current) => {
            const [position, widgetsOnPosition] = current;
            finalArr = [...finalArr, ...widgetsOnPosition];
            return finalArr;
        }, []);

        let filename = `${Date.now().toLocaleString()}-all-widgets.json`;
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