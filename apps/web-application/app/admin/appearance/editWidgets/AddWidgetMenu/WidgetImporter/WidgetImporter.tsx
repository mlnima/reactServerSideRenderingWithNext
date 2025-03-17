// @ts-nocheck
'use client';

import React, { useRef } from 'react';
import { createNewWidgetAction } from "@storeDashboard/reducers/widgetsReducer";
import { useAppDispatch } from "@storeDashboard/hooks";

const WidgetImporter = (): JSX.Element => {
    const inputFile = useRef(null);
    const dispatch = useAppDispatch();

    const onLoadHandler = async (e: any) => {
        try {
            const widgets = JSON.parse(e.target.result);
            for await (let widget of widgets) {
                dispatch(createNewWidgetAction(widget));
            }
        } catch (error) { }
    };

    return (
        <div className='import-widgets'>
            <input ref={inputFile} style={{ display: 'none' }} type='file' onChange={async (e) => {
                const reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                reader.onload = async (e) => onLoadHandler(e);
            }} />
            <button className='btn btn-primary' onClick={() => inputFile.current.click()}>
                Import Widget
            </button>
        </div>
    );
};

export default WidgetImporter;