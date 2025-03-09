'use client';

import React from "react";
import MonacoEditor from '@components/textEditors/MonacoEditor';

interface IProps {
    dayNightModeData: any;
    dayNightModeDefault: string;
    onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement> | string) => void;
}

const DayModeNightModeFields = ({
    dayNightModeData,
    dayNightModeDefault,
    onChangeHandler
}: IProps) => {
    return (
        <>
            <div className={'widgetSection'}>
                <p>Default Mode:</p>
                <select 
                    name={'dayNightModeDefault'}
                    onChange={onChangeHandler as React.ChangeEvent<HTMLSelectElement>}
                    className={'primarySelect'}
                    value={dayNightModeDefault}
                >
                    <option value='' >Select</option>
                    <option value={'night'}>Night</option>
                    <option value={'day'}>Day</option>
                </select>
            </div>
            <div className={'monaco-editor-section'}>
                <p>DayModeNightMode Data:</p>
                <MonacoEditor
                    language={'scss'}
                    name={'dayNightModeData'}
                    defaultValue={dayNightModeData || ''}
                    value={dayNightModeData}
                    className={'customStylesTextarea'}
                    onChange={onChangeHandler as string}
                />
            </div>
        </>
    );
};

export default DayModeNightModeFields;