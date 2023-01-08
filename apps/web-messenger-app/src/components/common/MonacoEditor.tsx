import React, {FC, useEffect, useState} from 'react';
import Editor from "@monaco-editor/react";

interface PropTypes {
    name: string,
    language?: string,
    theme?: string,
    value?: string,
    defaultValue?: string,
    className?: string,
    width?: number | string,
    height?: number | string,
    translation?: any,
    activeEditingLanguage?: string,
    onChange: Function
}

const MonacoEditor: FC<PropTypes> = (
    {
        name,
        onChange,
        language,
        theme,
        value,
        defaultValue,
        className,
        width,
        height,
    }) => {
    const [editorValue, setEditorValue] = useState('')

    useEffect(() => {
        //@ts-ignore
        setEditorValue(value)
    }, [value]);

    //@ts-ignore
    const onChangeHandler = (value: string, ev) => {

        if (value) {
            const e = {
                target: {
                    name: name,
                    value
                }
            }
            onChange(e)
        }
    }

    return (
        <>

            <Editor
                language={language || 'css'}
                theme={theme || 'vs-dark'}
                defaultValue={defaultValue || ''}
                value={editorValue}
                onMount={e => console.log(e)}
                //@ts-ignore
                onChange={(value,ev)=>onChangeHandler(value,ev)}
                className={className || ''}
                width={width || '100%'}
                height={height || '500px'}
            />
        </>
    );
};
export default MonacoEditor;
